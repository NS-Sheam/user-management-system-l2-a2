import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: IUser): Promise<IUser> => {
  if (
    (await User.isUserExist(userData.userId)) ||
    (await User.isUserExist(userData.email))
  ) {
    throw new Error("User already exist!");
  }
  const result = await User.create(userData);
  console.log(result);
  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (userId: number): Promise<IUser | null> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found!");
    error.name = "UserNotFoundError";
    throw error;
  }
  const result = await User.findOne({ userId });
  return result;
};

const updateUser = async (
  userId: number,
  user: IUser,
): Promise<IUser | null> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found!");
    error.name = "UserNotFoundError";
    throw error;
  }
  const updateStatus = await User.updateOne({ userId }, user, {
    new: true,
    runValidators: true,
  });
  if (updateStatus.modifiedCount === 0) {
    return null;
  }
  const result = await User.findOne({ userId });
  console.log(result);
  return result;
};

const deleteUser = async (userId: number): Promise<null> => {
  if (!(await User.isUserExist(userId))) {
    const error = new Error("User not found!");
    error.name = "UserNotFoundError";
    throw error;
  }
  await User.deleteOne({ userId });
  return null;
};

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
