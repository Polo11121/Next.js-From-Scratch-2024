import { connectToDb } from "@/config/database";
import { PropertyModel } from "@/models/Property";
import { FilterQuery } from "mongoose";

export const getProperties = async (
  filterQuery: FilterQuery<typeof PropertyModel> = {}
) => {
  await connectToDb();
  const properties = await PropertyModel.find(filterQuery);

  return properties;
};
