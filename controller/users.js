const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');
const DUMMY_USERS = [
    {   id:"u1",
        name:"gulshan",
        email:"gulshany01@gmail.com",
        password:"123456"
    },
    {   id:"u2",
        name:"sudarshan yadav",
        email:"sudarshany01@gmail.com",
        password:"123456"
    }
]

const getUsers = (req, res, next) => {
    res.status(200).json({DUMMY_USERS});
}


const signUp = (req, res,  next) => { 
    const error = validationResult(req);
    if(!error.isEmpty()){
        throw new HttpError("please enter valid email and password", 422);

    }
    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => {
        return u.email === email
    })
    if(hasUser){
        throw new HttpError("user already exists", 401);
    }

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser);
    res.status(201).json({DUMMY_USERS});
}


const login = (req, res, next) => {
//  const error = validationResult(req);
//     if(!error.isEmpty()){
//         throw new HttpError("please enter valid email and password", 422);   
//     }
    const {email, password} = req.body;
    const user = DUMMY_USERS.find(u => {
        return u.email === email; 
    })
    if(!user || user.password !== password){
        throw new HttpError("user is not valid ", 422);
    }
    if(user && user.password === password){
          res.status(201).json({user});   
    } 
}


exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;