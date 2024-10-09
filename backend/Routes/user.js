import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfile,
   getMyAppointments,
} from "../Controllers/userController.js";
import { authenticate , restrict} from "../auth/verifyToken.js";

const router = express.Router();

// Route to get all users
router.get("/",authenticate,restrict(['admin']), getAllUsers);

// Route to get a single user by ID
router.get("/:id",authenticate,restrict(['patient']), getSingleUser);

// Route to update a user by ID
router.put("/:id",authenticate,restrict(['patient']), updateUser); 

// Route to delete a user by ID
router.delete("/:id", authenticate,restrict(['patient']), deleteUser); 

router.get("/profile/me", authenticate, restrict(['patient']), getUserProfile); 

router.get("/appointments/my-appointments", authenticate,restrict(['patient']), getMyAppointments); 

export default router;
