import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { I18nManager, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const LANG_KEY = '@yqn_pay_lang';

export type AppLanguage = 'fr' | 'en' | 'ar';

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  ready: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const {i18n, t} = useTranslation();
  const [language, setLangState] = useState<AppLanguage>('fr');
  const [ready, setReady] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY).then(saved => {
      if (saved && ['fr', 'en', 'ar'].includes(saved)) {
        const lang = saved as AppLanguage;
        i18n.changeLanguage(lang);
        setLangState(lang);
      }
      setReady(true);
    });
  }, [i18n]);

  const setLanguage = useCallback(
    (lang: AppLanguage) => {
      const needsRTL = lang === 'ar';
      const currentlyRTL = I18nManager.isRTL;

      i18n.changeLanguage(lang);
      setLangState(lang);
      AsyncStorage.setItem(LANG_KEY, lang);

      // If RTL state needs to change, prompt restart
      if (needsRTL !== currentlyRTL) {
        I18nManager.forceRTL(needsRTL);
        I18nManager.allowRTL(needsRTL);
        Alert.alert(
          t('settings.rtlRestart'),
          '',
          [
            {text: t('settings.later'), style: 'cancel'},
            {
              text: t('settings.restart'),
              onPress: () => {
                // RN doesn't have a clean restart API — the user can manually
                // close and reopen the app. On some setups DevSettings.reload() works.
                try {
                  const DevSettings = require('react-native').DevSettings;
                  DevSettings?.reload?.();
                } catch {
                  // silently ignore on production
                }
              },
            },
          ],
        );
      }
    },
    [i18n, t],
  );

  return (
    <LanguageContext.Provider value={{language, setLanguage, ready}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
