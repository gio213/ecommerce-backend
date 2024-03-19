import pool from "../../db/connection.js";

const createItem = async (req, res) => {
  const user_id = req.decoded.user_id;
  const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    user_id,
  ]);

  if (user.rows[0].isadmin) {
    try {
      const { name, description, price, image, size, brand } = req.body;

      const category = req.params.category;
      if (category === "mens_category") {
        const query =
          "INSERT INTO mens_category (name, description, price, image, size, brand) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = [name, description, price, image, size, brand];
        const result = await pool.query(query, values);
        res.status(200).json(`Item added to mens category `);
      } else if (category === "womens_category") {
        const query =
          "INSERT INTO womens_category (name, description, price, image, size, brand) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = [name, description, price, image, size, brand];
        const result = await pool.query(query, values);
        res.status(200).json(`Item added to womens category `);
      } else {
        res.status(400).json("Invalid category");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(401).json("Not admin");
  }
};

export default createItem;
