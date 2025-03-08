import mongoose, { Document, Model, Schema } from "mongoose";

// Define User Interface
interface IUser extends Document {
  username: string;
  password: string;
}

// Define Schema
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create Model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;

