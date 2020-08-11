const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { registerValidation, loginValidation } = require('../validations/userValidation');

const registerUser = async (req, res) => {
  const { username, email, password, imageUrl } = req.body;
  try {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ msg: 'Username already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      imageUrl
    });

    await newUser.save();
    res.json({ msg: 'User Successfully registered' });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate Data
    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Username not found' });

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ msg: "Invalid Password" });

    //Add token
    const token = jwt.sign({
      // eslint-disable-next-line
      id: user._id,
    }, process.env.jwt_token);

    res.json({
      token,
      user: {
        // eslint-disable-next-line
        id: user._id,
        username: user.username,
        imageUrl: user.imageUrl
      },
    });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const checkTokenValidity = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.jwt_token);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userList = async (req, res) => {
  try {
    const users = await User.find().select("username _id");
    res.json(users);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
}


const authenticateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      username: user.username,
      id: user._id,
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('Blog')
    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      friends: user.friends,
      createdAt: user.createdAt
    })

    next();
  } catch (err) {
    res.status(400).json({ msg: err });
  }
}



module.exports = {
  registerUser,
  loginUser,
  checkTokenValidity,
  authenticateUser,
  getUserInfo,
  userList
};
