import { Request, Response } from "express";
import { userServices } from "./user.service";
import UserValidationSchema from "./user.validation";

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const validatedUserData = UserValidationSchema.parse(userData); // validate user data

    const result = await userServices.createUser(validatedUserData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message || "User creation failed!",
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message || "User retrieval failed!",
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
  } catch (error) {
    if ((error as Error).name === "UserNotFoundError") {
      // if user not found
      res.status(404).json({
        success: false,
        message: (error as Error).message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: (error as Error).message || "User retrieval failed!",
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
  } catch (error) {
    if ((error as Error).name === "UserNotFoundError") {
      // if user not found
      res.status(404).json({
        success: false,
        message: (error as Error).message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: (error as Error).message || "User updation failed!",
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
  } catch (error) {
    if ((error as Error).name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: (error as Error).message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: (error as Error).message || "User deletion failed!",
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
  } catch (error) {
    if ((error as Error).name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: (error as Error).message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: (error as Error).message || "order creation failed!",
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
  } catch (error) {
    if ((error as Error).name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: (error as Error).message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: (error as Error).message || "order retrieved failed!",
        error,
      });
    }
  }
};

// get total price of a orders
const getTotalOrderPrices = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getTotalOrderPrices(Number(userId));
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!!",
      data: { totalPrice: Number(result.toFixed(2)) },
    });
  } catch (error) {
    if ((error as Error).name === "UserNotFoundError") {
      res.status(404).json({
        success: false,
        message: (error as Error).message || "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: (error as Error).message || "order retrieved failed!",
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
  getTotalOrderPrices,
};
