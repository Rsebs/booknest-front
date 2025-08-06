import { availableLocales } from '@/lang/availableLocales';
import { createI18n } from 'vue-i18n';
import messages from '../lang';

const i18n = createI18n({
  messages,
  locale: navigator.language,
  fallbackLocale: 'en',
  availableLocales: availableLocales.map((l) => l.code),
});

export default i18n;
