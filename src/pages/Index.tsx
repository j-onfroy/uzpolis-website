import HeroSection from "@/components/HeroSection";
import FormSection from "@/components/FormSection";
import ServicesSection from "@/components/ServicesSection";
// import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FormSection />
      <ServicesSection />
      {/* <BenefitsSection /> */}
      <HowItWorks />
      <WhyUs />
      <FAQ />
      {/* <CTASection /> */}
      <Footer />
    </div>
  );
};

export default Index;
