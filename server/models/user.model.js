const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail, isStrongPassword} = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."],
        maxlength: [30, "First name must not be longer than 30 characters."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."],
        maxlength: [30, "Last name must not be longer than 30 characters."]
    },
    email: {
        type: String,
        required: [true, "Email address is required."],
        unique: [true, "This email address is already associated with an account!"],
        validate: [isEmail, "Please enter a valid email address."],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be eight characters or longer."],
        maxlength: [20, "Password must not be longer than 20 characters."],
        validate: {
            validator: function(password) {
                return isStrongPassword(password, {
                    minUppercase: 1,
                    minSymbols: 1,
                    minNumbers: 1
                });
            },
            message: "Password must contain one uppercase letter, one number, and one symbol."
        }
    }
}, {timestamps: true});

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords do not match!")
    }
    next();
});

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model("User", UserSchema)