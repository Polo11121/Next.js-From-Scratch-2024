import { ProfileProperty } from "@/components/profile-properties/profile-property";
import { Property } from "@/models/Property";

type ProfilePropertiesProps = {
  properties: Property[];
};

export const ProfileProperties = ({ properties }: ProfilePropertiesProps) => (
  <div className="md:w-3/4 md:pl-4">
    <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
    {properties.length ? (
      properties.map((property) => (
        <ProfileProperty property={property} key={property._id.toString()} />
      ))
    ) : (
      <p>You have no property listings</p>
    )}
  </div>
);
