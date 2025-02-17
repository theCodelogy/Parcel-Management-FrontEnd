import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="px-5 pt-5 flex justify-between md:justify-around items-center relative shadow pb-4 bg-white font-bold text-black">
      <img
        className="w-10"
        src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/220px-Reddit_Logo_Icon.svg.png"
        alt="Logo"
      />

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden focus:outline-none font-bold text-black"
      >
        {open ? (
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link className="hover:text-[#A31621] hover:underline" to="/">Home</Link>
        <Link className="hover:text-[#A31621] hover:underline" to="/services">Services</Link>
        <Link className="hover:text-[#A31621] hover:underline" to="/project">Project</Link>
        <Link className="hover:text-[#A31621] hover:underline" to="/about-us">About us</Link>
      </div>

      <div className="hidden md:flex space-x-4">
        <Link className="rounded-xl p-3 bg-[#A31621] text-[#FCF7F8] hover:bg-white hover:text-[#A31621]" to="/started">Get Started</Link>
        <Link className="rounded-xl p-3 border-2 border-white hover:bg-white hover:text-black" to="/talk">Let's talk</Link>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-gray-400 lg:hidden flex flex-col items-center py-5 space-y-4">
          <Link className="hover:text-[#A31621] hover:underline" to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link className="hover:text-[#A31621] hover:underline" to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link className="hover:text-[#A31621] hover:underline" to="/project" onClick={() => setOpen(false)}>Project</Link>
          <Link className="hover:text-[#A31621] hover:underline" to="/about-us" onClick={() => setOpen(false)}>About us</Link>
          <Link className="rounded-xl p-3 bg-[#A31621] hover:bg-white hover:text-[#FCF7F8]" to="/started" onClick={() => setOpen(false)}>Get Started</Link>
          <Link className="rounded-xl p-3 border-2 border-white hover:bg-white hover:text-black" to="/talk" onClick={() => setOpen(false)}>Let's talk</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
