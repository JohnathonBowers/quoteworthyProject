const UserController = require("../controllers/user.controllers")

module.exports = app => {
    app.post("/api/users/register", UserController.registerUser)
}