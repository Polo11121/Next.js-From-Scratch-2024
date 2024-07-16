"use client";

import { useEffect, useState } from "react";
import { ProfileMenuDropdown } from "@/components/navbar/profile-menu-dropdown";
import { MobileMenuDropdown } from "@/components/navbar/mobile-menu-dropdown";
import { DesktopNavbar } from "@/components/navbar/desktop-navbar";
import { NavbarBurgerButton } from "@/components/navbar/navbar-burger-button";
import { AuthenticationButton } from "@/components/navbar/authentication-button";
import { NotificationButton } from "@/components/navbar/notification-button";
import { useMediaQuery } from "@/hooks/use-media-query";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleToggleMobileMenuVisibility = () =>
    setIsMobileMenuOpen((prevState) => !prevState);

  useEffect(() => {
    if (isDesktop) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop]);

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <NavbarBurgerButton onClick={handleToggleMobileMenuVisibility} />
          </div>
          <DesktopNavbar isLoggedIn={isLoggedIn} />
          {!isLoggedIn && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                <AuthenticationButton />
              </div>
            </div>
          )}
          {isLoggedIn && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <NotificationButton />
              <ProfileMenuDropdown />
            </div>
          )}
        </div>
      </div>
      {isMobileMenuOpen && <MobileMenuDropdown isLoggedIn={isLoggedIn} />}
    </nav>
  );
};
