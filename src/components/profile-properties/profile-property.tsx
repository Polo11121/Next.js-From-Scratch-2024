import { Property } from "@/models/Property";
import Image from "next/image";
import Link from "next/link";

type ProfilePropertyProps = {
  property: Property;
};

export const ProfileProperty = ({ property }: ProfilePropertyProps) => (
  <div className="mb-10">
    <Link href={`/properties/${property.id}`}>
      <Image
        width={200}
        height={200}
        className="h-32 w-full rounded-md object-cover"
        src={property.images[0]}
        alt="Property 1"
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
        href={`/properties/${property.id}/edit`}
        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
      >
        Edit
      </Link>
      <button
        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
        type="button"
      >
        Delete
      </button>
    </div>
  </div>
);
