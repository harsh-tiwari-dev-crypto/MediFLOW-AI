import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";


// 1️⃣ Interface for User fields
interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}


// 2️⃣ Interface for User Document (adds methods)
interface IUserDocument extends IUser, Document {
  comparePassword(enteredPassword: string): Promise<boolean>;
}


// 3️⃣ Interface for User Model
interface IUserModel extends Model<IUserDocument> {}


// 4️⃣ Schema
const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);


// 🔐 HASH PASSWORD
userSchema.pre("save", async function (next) {
  const user = this as IUserDocument;

  if (!user.isModified("password")) return ;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});


// 🔑 COMPARE PASSWORD
userSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// 5️⃣ Model
export const User = mongoose.model<IUserDocument, IUserModel>(
  "User",
  userSchema
);