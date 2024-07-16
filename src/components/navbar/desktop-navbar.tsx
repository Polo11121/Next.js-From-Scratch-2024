"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-white.png";
import classNames from "classnames";

type DesktopNavbarProps = {
  isLoggedIn: boolean;
};

export const DesktopNavbar = ({ isLoggedIn }: DesktopNavbarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
      <Link className="flex flex-shrink-0 items-center" href="/">
        <Image className="h-10 w-auto" src={logo} alt="PropertyPulse logo" />
        <span className="hidden md:block text-white text-2xl font-bold ml-2">
          PropertyPulse
        </span>
      </Link>
      <div className="hidden md:ml-6 md:block">
        <div className="flex space-x-2">
          <Link
            href="/"
            className={classNames(
              "text-white  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2",
              { "bg-black": pathname === "/" }
            )}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className={classNames(
              "text-white  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2",
              { "bg-black": pathname === "/properties" }
            )}
          >
            Properties
          </Link>
          {isLoggedIn && (
            <Link
              href="/properties/add"
              className={classNames(
                "text-white  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2",
                { "bg-black": pathname === "/properties/add" }
              )}
            >
              Add Property
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
