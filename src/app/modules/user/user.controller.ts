import { Request, Response } from "express";
import { userServices } from "./user.service";
import UserValidationSchema from "./user.validation";

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const validatedUserData = UserValidationSchema.parse(userData);

    const result = await userServices.createUser(validatedUserData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User creation failed!",
      error: error || "something went wrong",
    });
  }
};

// get all user
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
      error: error || "something went wrong",
    });
  }
};

// get single user
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
    if (error.name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: error.message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message || "User retrieval failed!",
        error,
      });
    }
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;
    const result = await userServices.updateUser(Number(userId), userData);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error.name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: error.message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message || "User updation failed!",
        error,
      });
    }
  }
};

// delete user
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
    if (error.name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: error.message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message || "User deletion failed!",
        error,
      });
    }
  }
};

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { order } = req.body;
    const result = await userServices.createOrder(Number(userId), order);
    res.status(200).json({
      success: true,
      message: "Order creation successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error.name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: error.message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message || "order creation failed!",
        error,
      });
    }
  }
};

// get orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getOrders(Number(userId));
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully!",
      data: { orders: result },
    });
  } catch (error: any) {
    if (error.name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: error.message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message || "order retrieved failed!",
        error,
      });
    }
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getOrders,
};
