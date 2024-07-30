"use server";

import { connectToDb } from "@/config/database";
import { PropertyModel } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export const deleteProperty = async (propertyId: string) => {
  try {
    await connectToDb();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.id) {
      throw new Error("User ID is required");
    }

    const { id } = sessionUser;

    const property = await PropertyModel.findById(propertyId);

    if (!property) {
      return { error: "Property not found" };
    }

    if (property.owner.toString() !== id) {
      return { error: "You are not the owner of this property" };
    }

    await PropertyModel.deleteOne({ _id: propertyId, owner: id });

    revalidatePath("/profile");
  } catch (error) {
    return { error: "Could not delete property" };
  }
};
