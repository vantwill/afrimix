import express from "express";
import {
  changeUserPassword,
  deleteUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
  getLikedMusics,
  addLikedMusic,
  deleteLikedMusics,
  getUsers,
  deleteUser,
} from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.post("/", registerUser);
router.post("/login", loginUser);

// ******** PRIVATE ROUTES ********
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMusics);
router.post("/favorites", protect, addLikedMusic);
router.delete("/favorites", protect, deleteLikedMusics);

// ******** ADMIN ROUTES ********
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
