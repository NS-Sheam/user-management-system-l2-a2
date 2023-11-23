import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      //   data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User creation failed!",
    });
  }
};
