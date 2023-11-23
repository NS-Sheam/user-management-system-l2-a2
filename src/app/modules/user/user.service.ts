import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData);
  console.log(result);
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

const deleteUser = async (userId: number): Promise<IUser | null> => {
  const userToDelete = await User.findOne({ userId });
  const deleteStatus = await User.deleteOne({ userId });
  if (deleteStatus.deletedCount === 0) {
    return null;
  }
  return userToDelete;
};

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
