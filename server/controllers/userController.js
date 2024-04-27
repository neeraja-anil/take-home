import db from "../models/index.js";
import generateToken from "../utils/jwt.js";

const User = db.users;

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await user.validPassword(password))) {
      res.json({
        id: user.user_id,
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

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        id: user.user_id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
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