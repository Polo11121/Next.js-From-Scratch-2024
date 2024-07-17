import { connectToDb } from "@/config/database";
import { UserModel } from "@/models/User";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    signIn: async ({ profile }) => {
      if (!profile) {
        return false;
      }
      await connectToDb();
      const userExits = await UserModel.findOne({ email: profile.email });

      if (!userExits) {
        const truncatedUsername = profile.name?.slice(0, 20);

        await UserModel.create({
          email: profile.email,
          username: truncatedUsername,
          image: profile.image,
          bookmarks: [],
        });
      }

      return true;
    },
    session: async ({ session }) => {
      if (!session.user) {
        return session;
      }

      await connectToDb();
      const user = await UserModel.findOne({ email: session.user.email });

      if (!user) {
        return session;
      }

      session.user.id = user._id.toString();

      return session;
    },
  },
};
