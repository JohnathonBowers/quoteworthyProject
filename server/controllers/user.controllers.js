const User = require("../models/user.model")

module.exports = {
    // Create a new user
    registerUser: async (req, res) => {
        try {
            const potentialUser = await User.findOne({email: req.body.email});
            if (potentialUser) {
                return res.status(400).json({message: "The email you entered is already associated with an account!"})
            } else {
                const newUser = await User.create(req.body)
                return res.json({message: "Success!", user: newUser })
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    }    
}