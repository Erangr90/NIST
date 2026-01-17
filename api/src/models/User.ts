import mongoose from "mongoose";
import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";

// Need to change also in IUser interface
export enum Role {
  Admin = "ADMIN",
  User = "USER",
  SuperAdmin = "SUPER_ADMIN"
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    match: [
      /^[\u0590-\u05FFA-Z](?:[\u0590-\u05FF a-z]*[\u0590-\u05FFa-z])?$/,
      "MongoDB validation: User's name is not valid"
    ]
  },
  email: {
    type: String,
    required: true,
    match: [
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "MongoDB validation: User's email is not valid"
    ]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.User,
    required: true
  }
});

userSchema.index({ email: 1 }, { unique: true });

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (this: mongoose.HydratedDocument<IUser>) {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
