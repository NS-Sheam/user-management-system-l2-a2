import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userServices.createUser(userData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User creation failed!",
      error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User retrieval failed!",
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUser(Number(userId));
    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User retrieval failed!",
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { userData } = req.body;
    const result = await userServices.updateUser(Number(userId), userData);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User updation failed!",
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUser(Number(userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User deletion failed!",
      error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
