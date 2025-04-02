import mongoose, { Document, Model, Schema } from "mongoose";

// Define User Interface
interface IUser extends Document {
  username: string;
  password: string;
  email:string;
  dob:Date;
  createdAt:any;
}

// Define Schema
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
   createdAt: { type: Date, default: Date.now }
});

// Create Model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;