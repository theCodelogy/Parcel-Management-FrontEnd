/**
 * DashboardNavbar Component
 *
 * This component renders a responsive navigation bar for a dashboard.
 * It supports both desktop (large screens) and mobile/tablet (small screens) views.
 *
 * Features:
 * - Displays a logo on the left.
 * - Provides a language selector, notification icon, To-Do button, and profile picture on desktop.
 * - Adjusts to show a simplified menu (including a hamburger icon) on mobile devices.
 *
 * Props:
 * - onLanguageChange (optional): Callback invoked when the language selector is clicked.
 * - onNotificationClick (optional): Callback for notification icon clicks.
 * - onProfileClick (optional): Callback for when the profile picture is clicked.
 * - onToDoClick (optional): Callback for the To-Do button.
 */

import { Globe, Bell, Menu } from "lucide-react";
import logo from "../../../assets/logo.png";

interface NavHeaderProps {
  onLanguageChange?: (language: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onToDoClick?: () => void;
}

const DashboardNavbar = ({
  onLanguageChange,
  onNotificationClick,
  onProfileClick,
  onToDoClick,
}: NavHeaderProps) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center">
        {/*
          Render the logo image.
          Ensure the image source is correctly imported and exists in the assets.
        */}
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>

      {/* Desktop Navigation Items (visible on large screens) */}
      <div className="hidden lg:flex items-center">
        {/* Language Selector */}
        <div
          className="flex items-center cursor-pointer mr-4"
          onClick={() => onLanguageChange?.("English")}
        >
          {/*
            Display a flag image as a visual indicator for the language.
            Clicking this will trigger the onLanguageChange callback.
          */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/320px-Flag_of_the_United_States.svg.png"
            alt="USA Flag"
            className="w-6 h-4 mr-1 object-cover"
          />
          <span className="text-sm">English</span>
          {/* Dropdown icon indicating the possibility to change language */}
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Vertical divider */}
        <div className="mx-4 h-6 border-l border-gray-200"></div>

        {/* Globe Icon */}
        {/*
          Represents global settings or may serve as an additional language option.
          It is styled to be clickable.
        */}
        <Globe className="w-5 h-5 text-gray-600 cursor-pointer" />

        {/* Vertical divider */}
        <div className="mx-4 h-6 border-l border-gray-200"></div>

        {/* Notification Icon */}
        {/*
          Clicking this icon triggers the onNotificationClick callback.
        */}
        <Bell
          className="w-5 h-5 text-gray-600 cursor-pointer"
          onClick={onNotificationClick}
        />

        {/* Vertical divider */}
        <div className="mx-4 h-6 border-l border-gray-200"></div>

        {/* To-Do Button */}
        <button
          className="px-3 py-1 text-sm text-white bg-purple-600 rounded-md flex items-center"
          onClick={onToDoClick}
        >
          <span className="mr-1">To Do</span>
          {/*
            Icon representing the action to add or view tasks.
          */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Vertical divider */}
        <div className="mx-4 h-6 border-l border-gray-200"></div>

        {/* Profile Picture */}
        <div
          className="w-8 h-8 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
          onClick={onProfileClick}
        >
          {/*
            Display the user's profile image.
            Ensure the image URL is correct or replace it with a local asset as needed.
          */}
          <img
            src="https://i.ibb.co.com/bFMCnfT/me.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile/Tablet Navigation Items (visible on small screens) */}
      <div className="flex items-center lg:hidden space-x-4">
        {/* Globe Icon for mobile view */}
        <Globe className="w-5 h-5 text-gray-600 cursor-pointer" />

        {/* Notification Icon for mobile view */}
        <Bell
          className="w-5 h-5 text-gray-600 cursor-pointer"
          onClick={onNotificationClick}
        />

        {/* To-Do Button for mobile view */}
        <button
          className="px-3 py-1 text-sm text-white bg-purple-600 rounded-md flex items-center"
          onClick={onToDoClick}
        >
          <span className="mr-1">To Do</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Profile Picture for mobile view */}
        <div
          className="w-8 h-8 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
          onClick={onProfileClick}
        >
          <img
            src="https://i.ibb.co.com/bFMCnfT/me.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hamburger Menu Icon for mobile view */}
        <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>
    </nav>
  );
};

export default DashboardNavbar;
