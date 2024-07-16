import { connectToDb } from "@/config/database";
import { PropertyModel } from "@/models/Property";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const property = await PropertyModel.findById(params.id);

    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
