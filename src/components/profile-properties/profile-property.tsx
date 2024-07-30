"use client";

import { useTransition } from "react";
import { deleteProperty } from "@/actions/deleteProperty";
import { Property } from "@/models/Property";
import { toast } from "react-toastify";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

type ProfilePropertyProps = {
  property: Property;
};

export const ProfileProperty = ({ property }: ProfilePropertyProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () =>
    startTransition(async () => {
      const result = await deleteProperty(property._id.toString());

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Property successfully deleted");
    });

  return (
    <div className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <Image
          width={1000}
          height={200}
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt={`${property.name} image`}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city},
          {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className={classNames(
            "bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600",
            isPending && "opacity-50 cursor-not-allowed"
          )}
        >
          Edit
        </Link>
        <button
          disabled={isPending}
          onClick={handleDelete}
          className={classNames(
            "bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600",
            isPending && "opacity-50 cursor-not-allowed"
          )}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
