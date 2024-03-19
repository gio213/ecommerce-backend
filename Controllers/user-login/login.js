import pool from "../../db/connection.js";
import bcrypt from "bcryptjs";
import generateToken from "../../token/generateToken.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "Please enter all fields" });
  }
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log(user.rows);
    if (user.rows.length === 0) {
      return res.json({ message: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (validPassword) {
      const { user_id } = user.rows[0];
      const token = generateToken(user_id);
      // send token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      res.json({ token: token });
    } else {
      res.json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export default login;
