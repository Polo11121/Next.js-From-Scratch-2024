import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/autOptions";

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};
