"use server";

import { connectToDb } from "@/config/database";
import { PropertyModel } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

export const addProperty = async (formData: FormData) => {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User ID is required");
  }

  const { id } = sessionUser;

  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images") as File[];

  const filteredImages = images.filter((image) => image.name !== "");

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
    images: [] as string[],
  };

  const imageUploadPromises = [];

  for (const image of filteredImages) {
    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "propertypulse",
      }
    );

    imageUploadPromises.push(result.secure_url);
  }

  const uploadedImages = await Promise.all(imageUploadPromises);

  propertyData.images = uploadedImages;

  const newProperty = new PropertyModel(propertyData);
  await newProperty.save();

  redirect(`/properties/${newProperty._id}`);
};
