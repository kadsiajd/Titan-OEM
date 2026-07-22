import AboutHero from "@/features/about/components/aboutHero";
import CompanyIntroduction from "@/features/about/components/companyIntroduction";
import HistoryHeritage from "@/features/about/components/historyHeritage";
import Customers from "@/features/about/components/customers";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <CompanyIntroduction />
      <HistoryHeritage />
      <Customers />
    </main>
  );
}