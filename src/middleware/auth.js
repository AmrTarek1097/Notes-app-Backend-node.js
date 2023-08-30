import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";

export const auth = (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, process.env.JWT_KEY, async (error, decode) => {
    if (error) return res.send({ message: "In-valid Token" });

    const user = await userModel.findById(decode.id);

    if (!user) return res.json({ message: "User not exist" });

    if (user && user.isOnline == true && user.isDeleted == false) {
      req.user = user;
      return next();
    }

    if (user.isOnline == false || user.isDeleted == true)
      return res.json({ message: "Login in first please..." });
  });
};
