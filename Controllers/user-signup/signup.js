import pool from "../../db/connection.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, gender } = req.body;

    if (!first_name || !last_name || !email || !password || !gender) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Call the upload middleware to handle file upload

    const file = await req.fileUrl;
    console.log(file);
    if (!file)
      return res.status(400).json({ message: "Please upload an image" });

    await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, gender, profile_img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, last_name, email, bcryptPassword, gender, file]
    );

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export default signup;
