import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../i18n';
import { radius, space, useTheme } from '../theme/theme';
import { Txt } from './ui';

interface ToastOpts {
  onUndo?: () => void;
  duration?: number;
}
interface ToastCtx {
  show: (message: string, opts?: ToastOpts) => void;
}
const Ctx = createContext<ToastCtx>({ show: () => {} });

/** Petits messages en bas d'écran, avec bouton « Annuler » pendant 5 secondes quand c'est pertinent. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const { reduceMotion } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<{ message: string; onUndo?: () => void; key: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anim = useRef(new Animated.Value(0)).current;

  const hide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setToast(null);
  }, []);

  const show = useCallback((message: string, opts: ToastOpts = {}) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, onUndo: opts.onUndo, key: Date.now() });
    AccessibilityInfo.announceForAccessibility(message);
    timer.current = setTimeout(() => setToast(null), opts.duration ?? (opts.onUndo ? 5000 : 2500));
  }, []);

  useEffect(() => {
    if (!toast) return;
    anim.setValue(reduceMotion ? 1 : 0);
    if (!reduceMotion) Animated.timing(anim, { toValue: 1, duration: 180, useNativeDriver: true }).start();
  }, [toast, anim, reduceMotion]);

  const value = useMemo(() => ({ show }), [show]);
  return (
    <Ctx.Provider value={value}>
      {children}
      {toast && (
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.wrap,
            { bottom: insets.bottom + 150, opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] },
          ]}
        >
          <View style={[styles.toast, { backgroundColor: '#1D3557' }]} accessibilityLiveRegion="polite">
            <Txt style={{ flex: 1 }} color="#FFFFFF">
              {toast.message}
            </Txt>
            {toast.onUndo && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('undo')}
                onPress={() => {
                  toast.onUndo?.();
                  hide();
                }}
                hitSlop={10}
                style={{ paddingHorizontal: space(3), minHeight: 44, justifyContent: 'center' }}
              >
                <Txt color="#FFBF46" style={{ fontWeight: '800' }}>
                  {t('undo')}
                </Txt>
              </Pressable>
            )}
          </View>
        </Animated.View>
      )}
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: space(4), right: space(4) },
  toast: { borderRadius: radius.md, paddingLeft: space(4), paddingVertical: space(2), flexDirection: 'row', alignItems: 'center', minHeight: 52 },
});
