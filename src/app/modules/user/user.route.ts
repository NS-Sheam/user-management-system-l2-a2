import express, { Router } from "express";
import { userController } from "./user.controller";

const router: Router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:userId", userController.getSingleUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

export const UserRoutes = router;
