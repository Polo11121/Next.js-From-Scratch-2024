import { connectToDb } from "@/config/database";
import { PropertyModel } from "@/models/Property";

export const getPropertyById = async (id: string) => {
  await connectToDb();
  const property = await PropertyModel.findById(id);

  return property;
};
