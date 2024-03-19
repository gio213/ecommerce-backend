import pool from "../../db/connection.js";

const getAllItemsByGender = async (req, res) => {
  try {
    const user_id = req.decoded.user_id;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    const gender = user.rows[0].gender;
    let query, result;

    if (gender === "men" || gender === "women") {
      query = `SELECT * FROM ${gender}s_category`;
      console.log(query);
      result = await pool.query(query);
      console.log(result.rows);
      res
        .status(200)
        .json({
          message: `ALl items based users gender[${gender}]`,
          data: result.rows,
        });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getAllItemsByGender;
