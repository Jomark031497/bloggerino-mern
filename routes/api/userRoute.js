const express = require('express');
const router = express.Router();
const { registerUser, loginUser, checkTokenValidity } = require('../../controllers/userController');
const auth = require('../../middlewares/verifyToken');

const User = require('../../models/UserModel');

// METHOD: POST
// DESC: Register a user
// auth: false
router.post('/register', registerUser);

// METHOD: POST
// DESC: Login a user
// auth: true
router.post('/login', loginUser);


// METHOD: POSTs
// DESC: Check token of user
// auth: true
router.post('/isTokenValid', checkTokenValidity);

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id,
    })

});

router.get("/user-list", auth, async (req, res) => {
    try {
        const users = await User.find().select('username _id');
        res.json(users)

    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
})

module.exports = router;
