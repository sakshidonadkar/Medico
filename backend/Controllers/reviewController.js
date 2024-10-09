import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

//get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const createReview = async (req, res) => {
  // Ensure doctor exists
  // const doctor = await Doctor.findById(req.params.doctorId);
  // if (!doctor) {
  //     return res.status(404).json({ success: false, message: "Doctor not found" });
  // }

  // Set doctor and user in the review body if not already set
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  // Create the review
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();

    // Add review to the doctor's reviews
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
