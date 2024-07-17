"use client";

import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

type Provider = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider | null
>;

type Icons = Partial<
  Record<LiteralUnion<BuiltInProviderType, string>, JSX.Element>
>;

const ICONS: Icons = {
  google: <FaGoogle className="text-white mr-2" />,
};

export const AuthenticationButtons = () => {
  const [providers, setProviders] = useState<Provider | null>(null);
  useEffect(() => {
    const setAuthProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    setAuthProviders();
  }, []);

  return (
    <div className="flex space-x-4">
      {Object.values(providers || {}).map((provider) => {
        if (!provider) {
          return null;
        }

        const handleClick = () => signIn(provider.id);

        return (
          <button
            className="flex items-center text-white hover:bg-gray-700 bg-gray-900 hover:text-white rounded-md px-3 py-2"
            onClick={handleClick}
            key={provider.id}
          >
            {ICONS[provider.id]}
            Sign in with {provider.name}
          </button>
        );
      })}
    </div>
  );
};
