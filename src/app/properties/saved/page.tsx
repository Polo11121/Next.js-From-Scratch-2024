import { PropertiesList } from "@/components/properties/properties-list";
import { getUserBookmarks } from "@/services/getUserBookmarks";

const SavedProperties = async () => {
  const userBookmarks = await getUserBookmarks();

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertiesList properties={userBookmarks} />
        </div>
      </div>
    </section>
  );
};

export default SavedProperties;
