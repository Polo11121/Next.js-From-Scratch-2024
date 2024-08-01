import { ManagePropertyForm } from "@/components/manage-property/manage-property-form";
import { getPropertyById } from "@/services/getProperty";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";

type PropertyPageProps = {
  params: {
    id: string;
  };
};

const PropertyEditPage = async ({ params }: PropertyPageProps) => {
  if (!isValidObjectId(params.id)) {
    notFound();
  }

  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <ManagePropertyForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
