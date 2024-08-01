"use server";

import { AMENITIES } from "@/components/manage-property/amenities-checkboxes";
import { connectToDb } from "@/config/database";
import { Property, PropertyModel } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editProperty = async (property: Property, formData: FormData) => {
  const propertyId = property._id.toString();

  try {
    await connectToDb();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.id) {
      throw new Error("User ID is required");
    }

    const { id } = sessionUser;

    const amenities = AMENITIES.map((amenity) => formData.get(amenity)).filter(
      (amenity) => amenity !== null
    );

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: id,
      images: property.images,
    };

    await PropertyModel.updateOne(
      {
        id: propertyId,
      },
      propertyData
    );
  } catch (error) {
    return { error: "Could not edit property" };
  }

  revalidatePath(`/properties/${propertyId}`);
  redirect(`/properties/${propertyId}`);
};
