import { PropertiesList } from "@/components/properties/properties-list";
import { connectToDb } from "@/config/database";
import { PropertyModel } from "@/models/Property";

export const PropertiesPage = async () => {
  await connectToDb();
  const properties = await PropertyModel.find({});

  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertiesList properties={recentProperties} />
        </div>
      </div>
    </section>
  );
};

export default PropertiesPage;
