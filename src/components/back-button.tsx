"use client";

import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

type BackButtonProps = {
  href: string;
  text: string;
};

export const BackButton = ({ text, href }: BackButtonProps) => (
  <section>
    <div className="container m-auto py-6 px-6">
      <Link
        href={href}
        className="text-blue-500 hover:text-blue-600 flex items-center"
      >
        <FaArrowLeft className="mr-2" /> {text}
      </Link>
    </div>
  </section>
);
