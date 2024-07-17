import { Schema, model, models, Model } from "mongoose";

export interface User extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  username: string;
  image?: string;
  bookmarks: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModel = (models.User ||
  model<User>("User", UserSchema)) as Model<User>;
