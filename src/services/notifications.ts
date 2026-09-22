import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { INGREDIENT_BY_ID } from '../data/ingredients';
import { FREE_RECIPES } from '../data/recipes';
import type { Lang } from '../data/types';
import type { FridgeItem } from '../db/repo';
import { addDays, daysLeft, fromISODate, todayISO } from '../logic/expiry';
import { matchRecipes } from '../logic/matching';
import { translate } from '../i18n';
import type { Settings } from '../state/settings';

/**
 * Toutes les notifications sont LOCALES (programmées sur l'appareil).
 * Pas de push, pas de token, pas de serveur.
 * Pas d'alarmes exactes Android : une précision de quelques minutes suffit.
 */

const CHANNEL = 'reminders';
const PREFIX = { expiry: 'expiry-', dinner: 'dinner', recap: 'recap' };
const EXPIRY_HORIZON_DAYS = 14;

export function configureNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

async function ensureChannel(lang: Lang) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL, {
      name: translate(lang, 'notifChannel'),
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export async function getPermissionStatus(): Promise<'granted' | 'denied' | 'undetermined'> {
  const p = await Notifications.getPermissionsAsync();
  return p.granted ? 'granted' : p.canAskAgain ? 'undetermined' : 'denied';
}

export async function requestPermission(lang: Lang): Promise<boolean> {
  await ensureChannel(lang);
  const p = await Notifications.requestPermissionsAsync();
  return p.granted;
}

async function cancelByPrefix(prefix: string) {
  const all = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    all.filter((n) => n.identifier.startsWith(prefix)).map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier)),
  );
}

/**
 * Programme une notification par jour (à l'heure choisie) sur les 14 prochains jours,
 * uniquement les jours où au moins un produit périme dans ≤ 2 jours.
 * Recalculé à chaque changement du frigo et à chaque ouverture de l'app.
 */
async function scheduleExpiry(items: FridgeItem[], s: Settings, lang: Lang) {
  await cancelByPrefix(PREFIX.expiry);
  if (!s.expiryNotif) return;
  const now = new Date();
  const dated = items.filter((i) => i.expires_at);
  for (let k = 0; k < EXPIRY_HORIZON_DAYS; k++) {
    const dayIso = addDays(todayISO(now), k);
    const fire = fromISODate(dayIso);
    fire.setHours(s.expiryHour, s.expiryMinute, 0, 0);
    if (fire.getTime() <= now.getTime() + 60_000) continue;
    const urgent = dated.filter((i) => {
      const d = daysLeft(i.expires_at!, fire);
      return d >= 0 && d <= 2;
    });
    if (!urgent.length) continue;
    const first = urgent[0];
    const firstIng = first.ingredient_id ? INGREDIENT_BY_ID[first.ingredient_id] : undefined;
    const name = firstIng ? firstIng.name[lang] : first.custom_name ?? '';
    let body =
      urgent.length === 1
        ? translate(lang, 'notifExpiryOne', { name })
        : translate(lang, 'notifExpiryMany', { name, n: urgent.length - 1 });
    // petite idée de recette avec ces produits
    const ids = new Set(urgent.map((u) => u.ingredient_id).filter(Boolean) as string[]);
    const allIds = new Set(items.map((u) => u.ingredient_id).filter(Boolean) as string[]);
    const idea = matchRecipes(FREE_RECIPES, allIds, { diets: s.diets, allergies: s.allergies }, { urgent: ids, maxMissing: 0 }).find(
      (m) => m.usedUrgent.length > 0,
    );
    if (idea) body += ' ' + translate(lang, 'notifExpiryIdea', { recipe: idea.recipe.title[lang] });
    await Notifications.scheduleNotificationAsync({
      identifier: `${PREFIX.expiry}${dayIso}`,
      content: {
        title: translate(lang, 'notifExpiryTitle', { emoji: firstIng?.emoji ?? '🧊' }),
        body,
        data: { url: '/fridge' },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: fire, channelId: CHANNEL },
    });
  }
}

async function scheduleDinner(s: Settings, lang: Lang) {
  await cancelByPrefix(PREFIX.dinner);
  if (!s.dinnerNotif) return;
  await Notifications.scheduleNotificationAsync({
    identifier: PREFIX.dinner,
    content: { title: translate(lang, 'notifDinnerTitle'), body: translate(lang, 'notifDinnerBody'), data: { url: '/' } },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: s.dinnerHour, minute: 0, channelId: CHANNEL },
  });
}

async function scheduleRecap(s: Settings, lang: Lang) {
  await cancelByPrefix(PREFIX.recap);
  if (!s.recapNotif) return;
  await Notifications.scheduleNotificationAsync({
    identifier: PREFIX.recap,
    content: { title: translate(lang, 'notifRecapTitle'), body: translate(lang, 'notifRecapBody'), data: { url: '/progress' } },
    // weekday : 1 = dimanche
    trigger: { type: Notifications.SchedulableTriggerInputTypes.WEEKLY, weekday: 1, hour: 19, minute: 0, channelId: CHANNEL },
  });
}

/** Point d'entrée unique : (re)programme tout, seulement si la permission est accordée. */
export async function rescheduleAll(items: FridgeItem[], s: Settings, lang: Lang) {
  try {
    if ((await getPermissionStatus()) !== 'granted') return;
    await ensureChannel(lang);
    await scheduleExpiry(items, s, lang);
    await scheduleDinner(s, lang);
    await scheduleRecap(s, lang);
  } catch (e) {
    console.warn('[notifications]', e);
  }
}
