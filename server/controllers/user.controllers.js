const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const secret = process.env.SECRET_KEY

module.exports = {
    // Create a new user
    registerUser: async (req, res) => {
        try {
            const potentialUser = await User.findOne({email: req.body.email});
            if (potentialUser) {
                res.status(400).json({message: "The email you entered is already associated with an account!"})
            } else {
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email}, secret, {expiresIn: "1d"})
                res.cookie("usertoken", userToken, {httpOnly: true}).json({message: "success", user: newUser})
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    },
    // Log in a user
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if (user) {
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordMatch) {
                    const userToken = jwt.sign({id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email}, secret, {expiresIn: "1d"})
                    res.cookie("usertoken", userToken, {httpOnly: true}).json({message: "success", user: user})
                } else {
                    res.status(400).json({message: "Invalid login attempt!"})
                }
            } else {
                res.status(400).json({message: "Invalid login attempt!"})
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    },
    // Log out a user
    logoutUser: (req, res) => {
        res.clearCookie("usertoken")
        res.sendStatus(200)
    },
    // Find all users
    findAllUsers: (req, res) => {
        User.find({})
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json(err))
    },
    // Delete a user
    deleteOneUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.status(400).json(err))
    }
}