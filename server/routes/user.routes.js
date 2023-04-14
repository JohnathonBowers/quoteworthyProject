const UserController = require("../controllers/user.controllers")

module.exports = app => {
    app.post("/api/users/register", UserController.registerUser)
    app.post("/api/users/login", UserController.loginUser)
    app.post("/api/users/logout", UserController.logoutUser)
}