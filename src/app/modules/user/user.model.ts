import { Schema, model } from "mongoose";
import {
  IAddress,
  IFullName,
  IOrder,
  IUser,
  UserModel,
} from "./user.interface";

import bcrypt from "bcrypt";
import config from "../../config";

const fullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
  },
});

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    trim: true,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required"],
  },
});

const orderSchema = new Schema<IOrder>(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price is required"],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Quantity is required"],
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    trim: true,
    required: [true, "User ID must be required"],
  },
  username: {
    type: String,
    trim: true,
    required: [true, "Username is required"],
  },
  fullName: {
    type: fullNameSchema,
    _id: false,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  age: {
    type: Number,
    trim: true,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Email is required"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    type: addressSchema,
    _id: false,
  },
  orders: {
    type: [orderSchema],
  },
});

// methods---------------------------------------------
// static method for user exist or not
userSchema.statics.isUserExist = async function (idOrEmail: number | string) {
  let result;
  if (typeof idOrEmail === "string") {
    result = await this.findOne({ email: idOrEmail }); // find user by email
  } else if (typeof idOrEmail === "number") {
    result = await this.findOne({ userId: idOrEmail }); // find user by userId
  }
  return result ? true : false; //if user exist return true else false
};

// middlerwares---------------------------------------------
// encrypt password by bcrypt
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  ); // encrypt password
  next();
});

// hide password from response when user is created and order
userSchema.post("save", function (doc, next) {
  if (doc.orders && doc.orders.length === 0) {
    doc.orders = undefined;
  }
  doc.set("password", undefined);
  doc.set("_id", undefined);
  doc.set("__v", undefined);
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
