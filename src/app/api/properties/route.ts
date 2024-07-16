import { connectToDb } from "@/config/database";
import { PropertyModel } from "@/models/Property";

export const GET = async () => {
  try {
    await connectToDb();
    const properties = await PropertyModel.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
