import { BackButton } from "@/components/back-button";
import { BookmarkPropertyButton } from "@/components/properties/bookmark-property-button";
import { PropertyContactForm } from "@/components/properties/property-contact-form";
import { PropertyDetails } from "@/components/properties/property-details";
import { PropertyHeaderImage } from "@/components/properties/property-header-image";
import { PropertyImages } from "@/components/properties/property-images";
import { ShareProperty } from "@/components/properties/share-property";
import { getUserBookmarks } from "@/services/getUserBookmarks";
import { getPropertyById } from "@/services/getProperty";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
import { getSessionUser } from "@/utils/getSessionUser";

type PropertyPageProps = {
  params: {
    id: string;
  };
};

const PropertyPage = async ({ params }: PropertyPageProps) => {
  if (!isValidObjectId(params.id)) {
    notFound();
  }

  const property = await getPropertyById(params.id);
  const userBookmarks = await getUserBookmarks();
  const sessionUser = await getSessionUser();

  if (!property) {
    notFound();
  }

  const propertyId = property._id.toString();

  const isBookmarked = Boolean(
    userBookmarks.find(
      (userBookmark) => userBookmark._id.toString() === propertyId
    )
  );

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <BackButton href="/properties" text="Back to Properties" />{" "}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              {sessionUser && (
                <>
                  <BookmarkPropertyButton
                    propertyId={propertyId}
                    isBookmarked={isBookmarked}
                  />
                  <ShareProperty propertyId={propertyId} property={property} />
                </>
              )}
              <PropertyContactForm />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
