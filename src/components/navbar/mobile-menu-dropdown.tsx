"use client";

import { AuthenticationButton } from "@/components/navbar/authentication-button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

type MobileMenuDropdownProps = {
  isLoggedIn: boolean;
};
export const MobileMenuDropdown = ({ isLoggedIn }: MobileMenuDropdownProps) => {
  const pathname = usePathname();

  return (
    <div>
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Link
          href="/"
          className={classNames(
            "text-white block rounded-md px-3 py-2 text-base font-medium",
            { "bg-gray-900": pathname === "/" }
          )}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className={classNames(
            " text-white block rounded-md px-3 py-2 text-base font-medium",
            { "bg-gray-900": pathname === "/properties" }
          )}
        >
          Properties
        </Link>
        {isLoggedIn && (
          <Link
            href="/properties/add"
            className={classNames(
              "text-white block rounded-md px-3 py-2 text-base font-medium",
              { "bg-gray-900": pathname === "/properties/add" }
            )}
          >
            Add Property
          </Link>
        )}
        {!isLoggedIn && <AuthenticationButton />}
      </div>
    </div>
  );
};
