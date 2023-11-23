import { Query, Schema, model } from "mongoose";
import {
  IAddress,
  IFullName,
  IOrder,
  IUser,
  UserModel,
} from "./user.interface";

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

const orderSchema = new Schema<IOrder>({
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
});

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
  fullName: fullNameSchema,
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
  address: addressSchema,
  orders: {
    type: [orderSchema],
    required: false,
  },
});

// user exist or not
// static method for user exist or not
userSchema.statics.isUserExist = async function (idOrEmail: number | string) {
  let result;
  if (typeof idOrEmail === "string") {
    result = await this.findOne({ email: idOrEmail });
  } else if (typeof idOrEmail === "number") {
    result = await this.findOne({ userId: idOrEmail });
  }
  return result ? true : false;
};

// middlerware

// hide password from response when user is created and order
userSchema.post("save", function (doc, next) {
  console.log(doc);
  doc.orders?.length === 0 && (doc.orders = undefined);
  doc.set("password", undefined);
  next();
});
userSchema.pre("find", function (this: Query<IUser, Document>, next) {
  this.find().projection({
    username: 1,
    fullname: 1,
    email: 1,
    age: 1,
    address: 1,
    orders: { $elemMatch: { $exists: true } },
  });
  next();
});

userSchema.pre("findOne", function (this: Query<IUser, Document>, next) {
  this.findOne().projection({
    orders: 0,
    password: 0,
  });
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
