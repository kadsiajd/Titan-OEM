import { BusinessEnquiryForm } from '@/features/contact/components/BusinessEnquiryForm';
import { ContactHero } from '@/features/contact/components/ContactHero';
import { EnquiryBanner } from '@/features/contact/components/EnquiryBanner';
import { GetInTouch } from '@/features/contact/components/GetInTouch';

export default function ContactUsPage() {
  return (
    <div>
      <ContactHero />
      <GetInTouch />
      <BusinessEnquiryForm />
      <EnquiryBanner />
    </div>
  );
}
