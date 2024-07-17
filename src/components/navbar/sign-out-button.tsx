import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  const handleClick = () => signOut();

  return (
    <button
      className="block px-4 py-2 text-sm text-gray-700"
      role="menuitem"
      id="user-menu-item-2"
      tabIndex={-1}
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};
