import { Icon } from '../../components/Icon';
import { Tabs } from 'expo-router';
import { listShopping } from '../../db/repo';
import { useData, useFridge } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { FONTS, useTheme } from '../../theme/theme';

export default function TabsLayout() {
  const { c } = useTheme();
  const { t } = useI18n();
  const { urgentItems } = useFridge();
  const shoppingCount = useData(() => listShopping().filter((s) => !s.checked).length);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primaryText,
        tabBarInactiveTintColor: c.textMuted,
        tabBarStyle: { backgroundColor: c.surface, borderTopWidth: 0, minHeight: 64, paddingTop: 6, elevation: 12, shadowColor: c.shadow, shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: -4 } },
        tabBarLabelStyle: { fontSize: 12, fontFamily: FONTS.bodyBold },
        tabBarAllowFontScaling: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabCook'),
          tabBarIcon: ({ color, size, focused }) => <Icon name={focused ? 'restaurant' : 'restaurant-outline'} color={String(color)} size={size} />,
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          title: t('tabFridge'),
          tabBarBadge: urgentItems.length || undefined,
          tabBarBadgeStyle: { backgroundColor: c.danger, color: '#FFFFFF' },
          tabBarIcon: ({ color, size, focused }) => <Icon name={focused ? 'snow' : 'snow-outline'} color={String(color)} size={size} />,
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: t('tabShopping'),
          tabBarBadge: shoppingCount || undefined,
          tabBarBadgeStyle: { backgroundColor: c.primary, color: c.onPrimary, fontFamily: FONTS.bodyBold },
          tabBarIcon: ({ color, size, focused }) => <Icon name={focused ? 'cart' : 'cart-outline'} color={String(color)} size={size} />,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: t('tabRecipes'),
          tabBarIcon: ({ color, size, focused }) => <Icon name={focused ? 'heart' : 'heart-outline'} color={String(color)} size={size} />,
        }}
      />
    </Tabs>
  );
}
