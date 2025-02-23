import Hero from "../../components/ui/Hero";
import Image from "../../components/ui/Image";
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
      <Image/>
    </div>
  );
};

export default Home;