import { routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div
      className={`flex items-center gap-2 ${locale === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <LocaleSwitcherSelect
        defaultValue={locale}
        label={t('LocaleSwitcher.select')}
      >
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </LocaleSwitcherSelect>
    </div>
  );
}
