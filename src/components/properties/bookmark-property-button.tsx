"use client";

import { useTransition } from "react";
import { bookmarkProperty } from "@/actions/bookmarkProperty";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import classNames from "classnames";

type BookmarkPropertyProps = {
  propertyId: string;
  isBookmarked: boolean;
};

export const BookmarkPropertyButton = ({
  propertyId,
  isBookmarked,
}: BookmarkPropertyProps) => {
  const [isPending, startTransition] = useTransition();

  const handleBookmark = () =>
    startTransition(async () => {
      const result = await bookmarkProperty(propertyId);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        isBookmarked
          ? "Property successfully bookmarked"
          : "Property successfully unbookmarked"
      );
    });

  return (
    <button
      disabled={isPending}
      onClick={handleBookmark}
      className={classNames(
        "  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center",
        isBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      )}
    >
      <FaBookmark className="mr-2" /> {isBookmarked ? "Unbookmark" : "Bookmark"}{" "}
      Property
    </button>
  );
};
