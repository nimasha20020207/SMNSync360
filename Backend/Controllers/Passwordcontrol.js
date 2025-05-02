
const Passwords = require("../Model/PasswordModel");
const nodemailer = require('nodemailer');

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Configure Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
};

// Send verification email
const sendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const verificationCode = generateVerificationCode();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification Code',
      text: `Dear User,\n\nPlease use the following code to verify your email:\n\nVerification Code: ${verificationCode}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Verification email sent successfully", code: verificationCode });
  } catch (err) {
    console.error("Error sending verification email:", err);
    return res.status(500).json({ message: "Failed to send verification email. Please try again." });
  }
};

// Data display 
const getAllDetails = async (req, res, next) => {
  let passwords;
  try {
    passwords = await Passwords.find();
    if (!passwords || passwords.length === 0) {
      return res.status(404).json({ message: "No password reset details found" });
    }
    return res.status(200).json({ passwords });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching password reset details" });
  }
};

// Data insert
const adddetails = async (req, res, next) => {
  const { passwordid, email, userid, phoneNumber, question1, question2, reason } = req.body;
  let password;
  try {
    password = new Passwords({ passwordid, email, userid, phoneNumber, question1, question2, reason });
    await password.save();
    return res.status(201).json({ password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add password reset details" });
  }
};

// Get by ID 
const getById = async (req, res, next) => {
  const id = req.params.id;
  let password;
  try {
    password = await Passwords.findById(id);
    if (!password) {
      return res.status(404).json({ message: "Password reset request not found" });
    }
    return res.status(200).json({ password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while fetching password reset request" });
  }
};

// Update details
const Updatepassword = async (req, res, next) => {
  const id = req.params.id;
  const { passwordid, email, userid, phoneNumber, question1, question2, reason } = req.body;
  let password;
  try {
    password = await Passwords.findByIdAndUpdate(
      id,
      { passwordid, email, userid, phoneNumber, question1, question2, reason },
      { new: true, runValidators: true }
    );
    if (!password) {
      return res.status(404).json({ message: "Unable to update password reset details" });
    }
    return res.status(200).json({ password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while updating password reset details" });
  }
};

// Delete details
const Deletepassword = async (req, res, next) => {
  const id = req.params.id;
  try {
    const password = await Passwords.findByIdAndDelete(id);
    if (!password) {
      return res.status(404).json({ success: false, message: "Password reset request not found" });
    }
    return res.status(200).json({ 
      success: true, 
      message: "Password reset request deleted successfully",
      deletedPassword: password 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false, 
      message: "Server error while deleting password reset request" 
    });
  }
};

// Send email to user
const sendEmail = async (req, res, next) => {
  const id = req.params.id;
  try {
    const password = await Passwords.findById(id);
    if (!password) {
      return res.status(404).json({ message: "Password reset request not found" });
    }

    const userEmail = password.email;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Password Reset Request Processed',
      text: `Dear User,\n\nYour password reset request has been processed.\n\nDetails:\nPassword ID: ${password.passwordid}\nUser ID: ${password.userid}\nReason: ${password.reason}\n\nIf you did not request this, please contact support.\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ message: "Failed to send email. Please try again." });
  }
};

exports.getAllDetails = getAllDetails;
exports.adddetails = adddetails;
exports.getById = getById;
exports.Updatepassword = Updatepassword;
exports.Deletepassword = Deletepassword;
exports.sendEmail = sendEmail;
exports.sendVerificationEmail = sendVerificationEmail;
