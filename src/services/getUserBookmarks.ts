import { connectToDb } from "@/config/database";
import { UserModel } from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const getUserBookmarks = async () => {
  await connectToDb();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    return [];
  }

  const { id } = sessionUser;

  const user = await UserModel.findById(id);

  return user?.bookmarks || [];
};
