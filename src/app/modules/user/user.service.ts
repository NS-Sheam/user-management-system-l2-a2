import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: IUser): Promise<IUser> => {
  const result = await User.create(user);
  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOne({ userId });
  return result;
};

const updateUser = async (
  userId: number,
  user: IUser,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(userId, user, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (userId: number): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

const userService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
