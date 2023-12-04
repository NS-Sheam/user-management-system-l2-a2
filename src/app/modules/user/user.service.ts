import { IOrder, IUser } from "./user.interface";
import { User } from "./user.model";

// create user
const createUser = async (userData: IUser): Promise<IUser> => {
  if (
    (await User.isUserExist(userData.userId)) ||
    (await User.isUserExist(userData.email))
  ) {
    throw new Error("User already exist!");
  }
  const result = await User.create(userData);
  return result;
};

// get all users
const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 }, // projection
  );
  return result;
};

const getSingleUser = async (userId: number): Promise<IUser | null> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found");
    error.name = "UserNotFoundError";
    throw error;
  }
  const result = await User.findOne(
    { userId },
    { orders: 0, password: 0, _id: 0, __v: 0 },
  );
  return result;
};

// update user
const updateUser = async (
  userId: number,
  user: IUser,
): Promise<IUser | null> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found");
    error.name = "UserNotFoundError";
    throw error;
  }

  const updateStatus = await User.updateOne({ userId }, user, {
    new: true,
    runValidators: true,
  });
  if (updateStatus.modifiedCount === 0) {
    throw new Error("User not updated!");
  }
  const result = await User.findOne(
    { userId },
    { orders: 0, password: 0, _id: 0, __v: 0 },
  );
  return result;
};

// delete user
const deleteUser = async (userId: number): Promise<null> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found");
    error.name = "UserNotFoundError";
    throw error;
  }
  await User.deleteOne({ userId });
  return null;
};

// create order
const createOrder = async (userId: number, order: IOrder): Promise<null> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found");
    error.name = "UserNotFoundError";
    throw error;
  }
  const result = await User.updateOne({ userId }, { $push: { orders: order } });
  if (result.modifiedCount === 0) {
    throw new Error("Order creation failed!");
  }
  return null;
};

// get orders
const getOrders = async (userId: number): Promise<IOrder[] | null> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found");
    error.name = "UserNotFoundError";
    throw error;
  }
  const result = await User.findOne({ userId }, { orders: 1 });
  return result?.orders || null;
};

// total order prices calculation
const getTotalOrderPrices = async (userId: number): Promise<number> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found");
    error.name = "UserNotFoundError";
    throw error;
  }
  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: "$orders" },
    {
      $group: {
        _id: "$userId",
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },
    { $project: { totalPrice: 1 } },
  ]);
  return result[0]?.totalPrice || 0;
};

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getOrders,
  getTotalOrderPrices,
};
