import signup from "../Controllers/user-signup/signup.js";
import login from "../Controllers/user-login/login.js";
import getAllItems from "../Controllers/items/get-all-items.js";
import middleware from "../middleware/middleware.js";
import createItem from "../Controllers/items/create-item.js";
import getItemById from "../Controllers/items/get-item-by-id.js";
import deleteItemById from "../Controllers/items/delete-item-by-id.js";
import getAllItemByGender from "../Controllers/items/get-all-item-by-gender.js";
import fileUpload from "../Middleware/cloudinary.js";
import express from "express";
const router = express.Router();
// upload
router.post("/upload", fileUpload);
// Signup route
router.post("/signup", fileUpload, signup);

// Login route
router.get("/login", login);

// Get all items route
router.get("/items", middleware, getAllItems);

// Create item route
router.post("/create-item/:category?", middleware, createItem);

// Get item by id route
router.get("/get-item/:category/:item_id", middleware, getItemById);

// Delete item by id route
router.delete("/delete-item/:category/:item_id", middleware, deleteItemById);

// Get all items by gender
router.get("/items-by-gender", middleware, getAllItemByGender);

export default router;
