import Doctor from "./../models/DoctorSchema.js";
import Booking from "./../models/BookingSchema.js"
import BookingSchema from "./../models/BookingSchema.js";
export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Doctor Found",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "No doctor found" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    res.status(200).json({
      success: true,
      message: "All Doctors Found",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "Not found" });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId; // Assuming req.userId is set by the authenticate middleware

  try {
    // Find the user by ID
    const doctor = await Doctor.findById(doctorId);

    // If no user is found, return a 404 response
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Exclude password from the returned user data
    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({doctor:doctorId})

    // Send success response with user data (excluding password)
    return res.status(200).json({
      success: true,
      message: "Profile info retrieved successfully",
      data: { ...rest, appointments },
    });

  } catch (error) {
        // Send generic error response
    return res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get user profile",
    });
  }
}
