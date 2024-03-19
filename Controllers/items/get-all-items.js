import pool from "../../db/connection.js";

const getAllItems = async (req, res) => {
  try {
    const query = `
      SELECT
          items.item_id, items.name AS item_name, items.description, items.price, items.image,
          mens_category.name AS mens_category_name,
          womens_category.name AS womens_category_name
      FROM
          items
      LEFT JOIN
          mens_category ON items.mens_category_id = mens_category.category_id
      LEFT JOIN
          womens_category ON items.womens_category_id = womens_category.category_id;
    `;
    const { rows } = await pool.query(query);
    res.json(`All items: ${rows}`);
    pool.end();
  } catch (error) {
    console.error(error.message);
  }
};

export default getAllItems;
