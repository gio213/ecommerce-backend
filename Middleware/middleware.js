import jwt from "jsonwebtoken";
const passToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    console.log("No token found");
    res.json({ message: "No token found" });
  } else {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(token);
        console.log("Invalid token");
        res.json({ message: "Invalid token" });
      } else {
        req.decoded = decoded;
        // Extract user_id from token
        req.user = decoded.user_id;
        // console.log(decoded.user_id);
        console.log("Token passed");
        next();
      }
    });
  }
};

export default passToken;
