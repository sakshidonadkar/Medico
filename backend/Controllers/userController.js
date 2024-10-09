import User from "./../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "No user found" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "All Users Found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId; // Assuming req.userId is set by the authenticate middleware

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // If no user is found, return a 404 response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Exclude password from the returned user data
    const { password, ...rest } = user._doc;

    // Send success response with user data (excluding password)
    return res.status(200).json({
      success: true,
      message: "Profile info retrieved successfully",
      data: { ...rest },
    });

  } catch (error) {
        // Send generic error response
    return res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get user profile",
    });
  }
};


export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId });

    const doctorIds = bookings.map((el) => el.doctor.id);

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Appointments are getting",
        data: doctors,
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "something went wrong, cannot get user",
    });
  }
};




