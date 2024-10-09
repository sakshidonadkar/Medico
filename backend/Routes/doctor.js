import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";
const router = express.Router();

router.use("/:doctorId/reviews", reviewRouter);

// Route to get all users
router.get("/", getAllDoctors);

// Route to get a single user by ID
router.get("/:id", getSingleDoctor);

// Route to update a user by ID
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor); // Changed to PUT for update operations

// Route to delete a user by ID
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor); // Changed to DELETE for delete operations

router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
