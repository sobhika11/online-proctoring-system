const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: "Email and role required" });
    }

    // find or create user (simple auth)
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, role });
    }

    // create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
