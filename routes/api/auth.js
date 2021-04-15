const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const { registerValidation, loginValidation } = require('../../validation');

// Register
router.post('/register', async (req, res) => {

    // Validate data  before  register user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check user already in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user.id });
    } catch {
        res.status(400).send(err);
    }
});


//Login
router.post('/login', async (req, res) => {

    // Validate data  before  login user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Check if email exist in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist');
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //Create and assign token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);


    res.send('Logged in!!')
});





module.exports = router;