import Hero from "../../components/ui/Hero";
import Pricing from "../../components/ui/Pricing";
import Services from "../../components/ui/Service";
import WhyChooseUs from "../../components/ui/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Pricing />
    </div>
  );
};

export default Home;
