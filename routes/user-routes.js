const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const userController = require('../controller/users');
const { route } = require("./places-routes");

router.get('/', userController.getUsers);

router.post("/signup",[
    check('name')
        .not()
        .isEmpty(),
    check("email")
        .normalizeEmail()
        .isEmail(),
    check("password")
        .isLength({min: 5})

],
userController.signUp);

router.post("/login", userController.login);

module.exports = router; 