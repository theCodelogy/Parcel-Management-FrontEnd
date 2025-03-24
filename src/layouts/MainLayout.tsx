import { Outlet } from "react-router-dom";
import Footer from "../components/layout/public/Footer";
import Navbar from "../components/layout/public/Navbar";
import BackToTopButton from "@/components/ui/BackToTop";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default MainLayout;
