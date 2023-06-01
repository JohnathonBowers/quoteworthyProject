const { authenticate } = require("../config/jwt.config")
const UserController = require("../controllers/user.controllers")

module.exports = app => {
    app.get("/api/user/:userId", authenticate, UserController.findOneUserFirstName)
    app.post("/api/users/register", UserController.registerUser)
    app.post("/api/users/login", UserController.loginUser)
    app.post("/api/users/logout", UserController.logoutUser)
}