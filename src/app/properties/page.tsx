import { BackButton } from "@/components/back-button";
import { PropertiesList } from "@/components/properties/properties-list";
import { connectToDb } from "@/config/database";
import { getProperties } from "@/services/getProperties";

type PropertiesPageProps = {
  searchParams: {
    location: string;
    propertyType: string;
  };
};

const PropertiesPage = async ({
  searchParams: { location, propertyType },
}: PropertiesPageProps) => {
  let query: {
    $or?: Record<string, RegExp>[];
    type?: RegExp;
  } = {};

  if (location) {
    const locationPattern = new RegExp(location, "i");

    query["$or"] = [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ];
  }
  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  await connectToDb();

  const properties = await getProperties(query);

  return (
    <section className="px-4 py-6">
      <BackButton href="/" text="Go back to Home" />
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertiesList properties={properties} />
        </div>
      </div>
    </section>
  );
};

export default PropertiesPage;
