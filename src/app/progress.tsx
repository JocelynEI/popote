import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Button, Card, Screen, Section, Txt } from '../components/ui';
import { cookedCount, distinctCookedCount, monthlySeries, unlockedBadges, wasteCounts } from '../db/repo';
import { useData } from '../hooks/useData';
import { useI18n } from '../i18n';
import { AVG_SAVED_VALUE_EUR, estimatedSavings, progressCards, visibleBadges } from '../logic/badges';
import { usePremium } from '../services/premium';
import { startOfMonthIso, startOfWeekIso } from '../services/progress';
import { radius, space, useTheme } from '../theme/theme';

/**
 * Gratuit : compteur du mois, récap de la semaine, badges obtenus et le prochain.
 * Premium : statistiques détaillées (aperçu estompé pour les non-premium).
 * Rien ne fête un zéro et aucune statistique ne porte sur ce qui a été jeté.
 */
export default function ProgressScreen() {
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const { isPremium } = usePremium();

  const month = useData(() => wasteCounts(startOfMonthIso()));
  const week = useData(() => ({ w: wasteCounts(startOfWeekIso()), cooked: cookedCount(startOfWeekIso()) }));
  const total = useData(() => ({ w: wasteCounts(), cooked: cookedCount(), distinct: distinctCookedCount() }));
  const badges = useData(unlockedBadges);
  const series = useData(() => monthlySeries(6));

  const cards = progressCards({ monthSaved: month.saved, weekCooked: week.cooked, weekSaved: week.w.saved });
  const shownBadges = visibleBadges(badges);
  const max = Math.max(1, ...series.map((s) => Math.max(s.saved, s.cooked)));
  const monthLabel = (m: string) => new Date(`${m}-15T12:00:00`).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { month: 'short' });

  const advanced = (
    <View>
      <View style={{ flexDirection: 'row', gap: space(3) }}>
        <Stat label={t('statsCooked')} value={String(total.cooked)} />
        <Stat label={t('statsSaved')} value={String(total.w.saved)} />
      </View>
      <View style={{ flexDirection: 'row', gap: space(3), marginTop: space(3) }}>
        <Stat label={t('statsSavings')} value={`${estimatedSavings(total.w.saved)} €`} />
        <Stat label={t('statsDistinct')} value={String(total.distinct)} />
      </View>
      <Txt v="small" muted style={{ marginTop: space(2) }}>
        {t('statsSavingsNote', { v: String(AVG_SAVED_VALUE_EUR).replace('.', lang === 'fr' ? ',' : '.') })}
      </Txt>

      <Txt v="h3" style={{ marginTop: space(5), marginBottom: space(2) }}>
        {t('statsLast6')}
      </Txt>
      {/* barres horizontales : produits sauvés / recettes cuisinées, valeur écrite à côté */}
      {series.map((s) => (
        <View
          key={s.month}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: space(2) }}
          accessible
          accessibilityLabel={`${monthLabel(s.month)} : ${t('statsSaved')} ${s.saved}, ${t('statsCooked')} ${s.cooked}`}
        >
          <Txt v="small" style={{ width: 44 }}>
            {monthLabel(s.month)}
          </Txt>
          <View style={{ flex: 1, gap: 3 }}>
            <Bar value={s.saved} max={max} color={c.success} />
            <Bar value={s.cooked} max={max} color={c.primary} />
          </View>
        </View>
      ))}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space(2) }}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.success }} />
        <Txt v="small" muted>
          {t('statsSaved')}
        </Txt>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.primary, marginLeft: space(2) }} />
        <Txt v="small" muted>
          {t('statsCooked')}
        </Txt>
      </View>
    </View>
  );

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(4), paddingBottom: space(16) }}>
        {cards.month !== null && (
          <Card style={{ backgroundColor: c.successBg }}>
            <Txt v="label" color={c.success}>
              {t('thisMonth')}
            </Txt>
            <Txt v="h2" color={c.success} style={{ marginTop: space(1) }}>
              {t('savedThisMonth', { n: cards.month })}
            </Txt>
          </Card>
        )}

        {cards.week !== null && (
          <Card style={{ marginTop: cards.month !== null ? space(3) : 0 }}>
            <Txt v="label" muted>
              {t('thisWeek')}
            </Txt>
            {cards.week.cooked > 0 && <Txt style={{ marginTop: space(1) }}>{t('weekCooked', { c: cards.week.cooked })}</Txt>}
            {cards.week.saved > 0 && (
              <Txt style={{ marginTop: space(1) }}>{t('weekSaved', { s: cards.week.saved, e: estimatedSavings(cards.week.saved) })}</Txt>
            )}
          </Card>
        )}

        <Section title={t('badges')}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space(3) }}>
            {shownBadges.map(({ def: b, got }) => (
              <View
                key={b.id}
                accessible
                accessibilityLabel={`${got ? '' : `${t('nextBadge')} : `}${l(b.title)}. ${l(b.desc)}.`}
                style={{ width: '30%', alignItems: 'center', padding: space(2), borderRadius: radius.md, backgroundColor: got ? c.surfaceAlt : c.surface, borderWidth: got ? 0 : 1, borderColor: c.border, borderStyle: 'dashed' }}
              >
                <Txt style={{ fontSize: 34, opacity: got ? 1 : 0.45 }}>{b.emoji}</Txt>
                {!got && (
                  <Txt v="small" color={c.primaryText} style={{ fontWeight: '700' }}>
                    {t('nextBadge')}
                  </Txt>
                )}
                <Txt v="small" style={{ textAlign: 'center', fontWeight: '700' }}>
                  {l(b.title)}
                </Txt>
                <Txt v="small" muted style={{ textAlign: 'center', fontSize: 12 }}>
                  {l(b.desc)}
                </Txt>
              </View>
            ))}
          </View>
        </Section>

        <Section title={`${t('advancedStats')}${isPremium ? '' : ' 🔒'}`}>
          {isPremium ? (
            advanced
          ) : (
            <View>
              {/* aperçu : contenu estompé + le vrai chiffre du mois en clair */}
              <View style={{ opacity: 0.18 }} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none">
                {advanced}
              </View>
              <View style={{ position: 'absolute', left: 0, right: 0, top: space(6), alignItems: 'center', padding: space(4) }}>
                <Card style={{ alignItems: 'center', backgroundColor: c.bg, borderColor: c.primary, borderWidth: 1 }}>
                  {cards.month !== null && (
                    <Txt v="h2" style={{ textAlign: 'center', marginBottom: space(3) }}>
                      {t('savedThisMonth', { n: cards.month })}
                    </Txt>
                  )}
                  <Button title={t('statsPreviewCta')} icon="lock-open-outline" onPress={() => router.push('/premium')} />
                </Card>
              </View>
            </View>
          )}
        </Section>
      </ScrollView>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const { c } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: c.surface, borderRadius: radius.md, padding: space(3) }} accessible accessibilityLabel={`${label} : ${value}`}>
      <Txt v="h2">{value}</Txt>
      <Txt v="small" muted>
        {label}
      </Txt>
    </View>
  );
}

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space(2) }}>
      <View style={{ height: 10, borderRadius: 5, backgroundColor: color, width: `${Math.max(2, (value / max) * 85)}%` }} />
      <Txt v="small">{value}</Txt>
    </View>
  );
}
