import { CategorySection } from '@/features/home/components/CategorySection';
import { CompanyOverview } from '@/features/home/components/CompanyOverview';
import { ContactCta } from '@/features/home/components/ContactCta';
import { HeroBanner } from '@/features/home/components/HeroBanner';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CompanyOverview />
      <CategorySection />
      <ContactCta />
    </div>
  );
}
