import express, { Router } from "express";
import { userController } from "./user.controller";

const router: Router = express.Router();

// user routes
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:userId", userController.getSingleUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

// order routes
router.put("/:userId/orders", userController.createOrder);
router.get("/:userId/orders", userController.getOrders);
router.get("/:userId/orders/total-price", userController.getTotalOrderPrices);

export const UserRoutes = router;
