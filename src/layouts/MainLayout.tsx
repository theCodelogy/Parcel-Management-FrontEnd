import { Outlet } from "react-router-dom";
import Footer from "../components/layout/public/Footer";
import Navbar from "../components/layout/public/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
