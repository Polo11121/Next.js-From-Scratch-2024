import { connectToDb } from "@/config/database";
import { Property, PropertyModel } from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToSerializeableObject";
import { FilterQuery } from "mongoose";

export const getProperties = async (
  filterQuery: FilterQuery<typeof PropertyModel> = {}
) => {
  await connectToDb();
  const properties = await PropertyModel.find(filterQuery);

  return properties.map((property) =>
    convertToSerializeableObject(property.toObject())
  ) as Property[];
};
