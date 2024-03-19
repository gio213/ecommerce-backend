import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = multer.memoryStorage();

// Create a middleware to upload files

const fileUpload = (req, res, next) => {
  try {
    const upload = multer({ storage }).single("file");
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Something went wrong with file upload" });
      }

      // If upload is successful, set req.fileUrl
      if (req.file) {
        const fileStr = req.file.buffer.toString("base64");
        const folder = "Ecommerce/profile_images"; // Change this to your desired folder name
        const uploadedResponse = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${fileStr}`,
          { folder: folder }
        );
        req.fileUrl = uploadedResponse.secure_url;
      }
      console.log(" successfully uploaded");

      next(); // Call next to move to the next middleware or route handler
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default fileUpload;

// export default fileUpload = async (req, res, next) => {
//   try {
//     upload(req, res, async (err) => {
//       if (err) {
//         return res
//           .status(400)
//           .json({ message: "Something went wrong with file upload" });
//       }

//       // If upload is successful, set req.fileUrl
//       if (req.file) {
//         const fileStr = req.file.buffer.toString("base64");
//         const folder = "Ecommerce/profile_images"; // Change this to your desired folder name
//         const uploadedResponse = await cloudinary.uploader.upload(
//           `data:${req.file.mimetype};base64,${fileStr}`,
//           { folder: folder }
//         );
//         req.fileUrl = uploadedResponse.secure_url;
//       }

//       next(); // Call next to move to the next middleware or route handler
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
