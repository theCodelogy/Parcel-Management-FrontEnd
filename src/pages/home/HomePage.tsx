import Hero from "../../components/ui/Hero";
import Pricing from "../../components/ui/Pricing";
import Services from "../../components/ui/Service";
import WhyChooseUs from "../../components/ui/WhyChooseUs";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Pricing />
    </div>
  );
};

export default HomePage;
