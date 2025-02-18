// import AchievementSection from "../../Component/AchievementSection";


import Hero from "../../Component/Hero";

import Pricing from "../../Component/Pricing";
// import RegisterFrom from "../../Component/RegisterFrom";
import Services from "../../Component/Service";
import WhyChooseUs from "../../Component/WhyChooseUs";
import Footer from "../../Shared/Footer/Footer";

const Home = () => {
    return (
        <div>
        <Hero/>
        <Services/>
        <WhyChooseUs/>
        <Pricing/>
   
    
        
        {/* <AchievementSection/> */}
        <Footer/>
        </div>
    );
};

export default Home;