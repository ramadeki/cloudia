// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../api/db"); // koneksi MySQL kamu

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek user dari database
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    // Cek password hash
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Password salah" });
    }

    // Generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, role_id: user.role_id, email: user.email },
      process.env.JWT_SECRET || "CLOUDIA_SECRET_KEY",
      { expiresIn: "12h" }
    );

    res.json({
      user_id: user.user_id,
      name: user.name,
      role_id: user.role_id,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

module.exports = router;
