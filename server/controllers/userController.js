// import db from "../models/index.js";
import generateToken from "../utils/jwt.js";
import User from "../models/userModel.js";

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    if (await user.matchPassword(password)) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.user_id),
      });
    } else {
      res.status(404).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

//@desc   Register new user
//@route  POST /api/users
//@access public
const registerNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user.user_id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

export { authUser, registerNewUser };
