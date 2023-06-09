const User = require("../Model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");


const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({});

    if (!users) {
        return res.status(200).json({ message: "No user found" });
    }
    return res.status(200).json(users)
});

const Signup = asyncHandler(async (req, res, next) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All Fields Are Required");
    }

    let existingUser;
    existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400)
        throw new Error("User Already Exists")
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = User({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    });

    await user.save();
    return res.status(200).json({ user });

});

const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory.");
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
        res.status(401);
        throw new Error("Password or email is incorrect");
    }

    const matchPassword = bcrypt.hashSync(password, userExists.password);

    if (!matchPassword) {
        res.status(401);
        throw new Error("Password or email is incorrect");
    }

    return res.status(200).json({ message: "Login Successfully" });
})


module.exports = { getAllUser, Signup, userLogin };