import pool from "../../db/connection.js";

const deleteItemById = async (req, res) => {
  try {
    const { item_id, category } = req.params;
    let query, result;

    if (category === "mens_category" || category === "womens_category") {
      query = `DELETE FROM ${category} WHERE category_id = $1 RETURNING *`;
      result = await pool.query(query, [item_id]);

      if (result.rows.length === 0) {
        res
          .status(404)
          .json({ message: `No item found with ID ${item_id} in ${category}` });
      } else {
        res.status(200).json({
          message: `Item with ID ${item_id} in ${category} deleted successfully`,
          deletedItem: result.rows[0],
        });
      }
    } else {
      res.status(400).json({ message: "Invalid category" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteItemById;
