import Hero from "../../components/ui/Hero";
import Pricing from "../../components/ui/Pricing";
import Services from "../../components/ui/Service";
import WhyChooseUs from "../../components/ui/WhyChooseUs";
// import Sample from "../Sample";

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Pricing />
      {/* <Sample /> */}
    </div>
  );
};

export default HomePage;
