const ansyncHandler = require("express-async-handler");
const bcyrpt = require("bcrypt");
const User = require("../models/UserModel");

//@desc Register New User
//@route POST /api/register
//@access public
const registerUser = ansyncHandler(
    async (req,res)=>{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            res.status(400);
            throw new Error("All Fields are mandatory");
        }

        const userAvailable = await User.findOne({email});
        if(userAvailable){
            res.status(400);
            throw new Error("User already Exists");
        }

        //Hash Password
        const hashedPass = await bcyrpt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password: hashedPass
        });

        if(user){
            res.status(201).json({  _id:user._id, email:user.email});
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }    
    }
);

//@desc Login User
//@route POST /api/login
//@access public
const loginUser = ansyncHandler(
    async (req,res)=>{
        res.status(200).json({message:"Login user"});
    }
);

//@desc Current User
//@route GET /api/current
//@access public
const currentUser = ansyncHandler(
    async (req,res)=>{
        res.status(200).json({message:"Current user Info."});
    }
);


module.exports = {registerUser,loginUser,currentUser};