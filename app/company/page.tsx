import { I18nProvider } from '@/components/i18n-provider';
import CompanyContent from './_components/CompanyContent';

export default function CompanyPage() {
  return (
    <I18nProvider>
      <CompanyContent />
    </I18nProvider>
  );
}
