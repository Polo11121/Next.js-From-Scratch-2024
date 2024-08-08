import { connectToDb } from "@/config/database";
import { Property, PropertyModel } from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToSerializeableObject";

export const getPropertyById = async (id: string) => {
  await connectToDb();
  const property = await PropertyModel.findById(id);

  if (!property) {
    return null;
  }

  const serializedProperty = convertToSerializeableObject(property.toObject());
  return serializedProperty as Property;
};
