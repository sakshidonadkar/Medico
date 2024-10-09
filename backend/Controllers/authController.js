import User from "./../models/UserSchema.js";
import Doctor from "./../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY ,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    // Check if the user already exists
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Salt rounds = 10
    const hashPassword = await bcrypt.hash(password, salt);
    console.log("Hashed password:", hashPassword); // Log hashed password for debugging

    // Create the user object based on role
    if (role === "patient") {
      user = new User({
        email,
        password: hashPassword, // Save hashed password
        name,
        role,
        photo,
        gender,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        email,
        password: hashPassword, // Save hashed password
        name,
        role,
        photo,
        gender,
      });
    }

    // Save the user in the database
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ success: false, message: "User creation failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    // Find the user, whether a patient or doctor
    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log hashed password and the password provided for debugging
    console.log("Hashed password from DB:", user.password);
    console.log("Provided password:", password);

    // Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Log whether the password matches or not
    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Exclude sensitive fields and return the user data with the token
    const { password: userPassword, ...rest } = user._doc; // Exclude password from response

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
