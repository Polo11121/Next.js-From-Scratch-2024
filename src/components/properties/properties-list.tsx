import { Property } from "@/models/Property";
import { PropertyCard } from "@/components/properties/property-card";

type PropertiesListProps = {
  properties: Property[];
};

export const PropertiesList = ({ properties }: PropertiesListProps) =>
  properties.length ? (
    <>
      {properties.map((property) => (
        <PropertyCard property={property} key={property._id.toString()} />
      ))}
    </>
  ) : (
    <p>No Properties Found</p>
  );
