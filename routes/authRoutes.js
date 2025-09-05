// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to set user collections
router.use((req, res, next) => {
  req.patientCollection = req.app.locals.db.collection("patients");
  req.doctorCollection = req.app.locals.db.collection("doctors");
  next();
});

// --------------------
// Register Patient
// POST /auth/register/patient
router.post("/register/patient", async (req, res) => {
  try {
    const { name, email, password, photo_url } = req.body;

    // Check if patient exists
    const existing = await req.patientCollection.findOne({ email });
    if (existing) return res.status(400).json({ message: "Patient already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = { name, email, password: hashedPassword, photo_url };
    const result = await req.patientCollection.insertOne(newPatient);

    res.status(201).json({ message: "Patient registered", newPatient, result });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
});

// --------------------
// Register Doctor
// POST /auth/register/doctor
router.post("/register/doctor", async (req, res) => {
  try {
    const { name, email, password, specialization, photo_url, role } = req.body;

    // Check if doctor exists
    const existing = await req.doctorCollection.findOne({ email });
    if (existing) return res.status(400).json({ message: "Doctor already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = { name, email, password: hashedPassword, specialization, photo_url, role };
    const result = await req.doctorCollection.insertOne(newDoctor);

    res.status(201).json({ message: "Doctor registered", result });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
});

// --------------------
// Login
// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role)
      return res.status(400).json({ message: "All fields required" });

    const collection = role === "DOCTOR" ? req.doctorCollection : req.patientCollection;

    const user = await collection.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

module.exports = router;
