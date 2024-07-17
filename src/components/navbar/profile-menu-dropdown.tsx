"use client";

import { useState } from "react";
import { SignOutButton } from "@/components/navbar/sign-out-button";
import Link from "next/link";
import Image from "next/image";
import profileDefault from "@/assets/profile.png";

type ProfileMenuDropdownProps = {
  profileImage?: string | null;
};

export const ProfileMenuDropdown = ({
  profileImage,
}: ProfileMenuDropdownProps) => {
  const [isProfileMenuDropdownOpen, setIsProfileMenuDropdownOpen] =
    useState(false);

  const handleToggleProfileMenuDropdownVisibility = () =>
    setIsProfileMenuDropdownOpen((prevState) => !prevState);

  return (
    <div className="relative ml-3">
      <div>
        <button
          onClick={handleToggleProfileMenuDropdownVisibility}
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src={profileImage || profileDefault}
            alt="Profile picture"
          />
        </button>
      </div>
      {isProfileMenuDropdownOpen && (
        <div
          id="user-menu"
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            id="user-menu-item-0"
            tabIndex={-1}
          >
            Your Profile
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            id="user-menu-item-2"
            tabIndex={-1}
          >
            Saved Properties
          </Link>
          <SignOutButton />
        </div>
      )}
    </div>
  );
};
