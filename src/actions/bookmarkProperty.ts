"use server";

import { connectToDb } from "@/config/database";
import { PropertyModel } from "@/models/Property";
import { UserModel } from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export const bookmarkProperty = async (propertyId: string) => {
  try {
    await connectToDb();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.id) {
      throw new Error("User ID is required");
    }

    const { id } = sessionUser;

    const property = await PropertyModel.findById(propertyId);

    const user = await UserModel.findById(id);

    if (!user) {
      return { error: "User not found" };
    }

    if (!property) {
      return { error: "Property not found" };
    }

    const isBookmarked = user.bookmarks.includes(property._id);

    if (isBookmarked) {
      await UserModel.findByIdAndUpdate(
        id,
        { $pull: { bookmarks: property._id } },
        { new: true }
      );
    } else {
      await UserModel.findByIdAndUpdate(
        id,
        { $push: { bookmarks: property._id } },
        { new: true }
      );
    }

    revalidatePath(`/properties/${propertyId}`);
    revalidatePath("/properties/saved");
  } catch (error) {
    return { error: "Could not bookmark property" };
  }
};
