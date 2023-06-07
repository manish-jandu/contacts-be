const ansyncHandler = require("express-async-handler");
const bcyrpt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

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
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400);
            throw new Error("Please enter Email and Password");
        }

        const user = await User.findOne({email});
        const isPassCorrect = await bcyrpt.compare(password,user.password);

        if(user && isPassCorrect){
            const accessToken = jwt.sign(
                payload = {
                    User: {
                        username: user.username,
                        email: user.email,
                        id: user._id
                    },
                },
                secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "20m"}
            );
            res.status(200).json({accessToken});
        } else {
            res.status(401);
            throw new Error("email or password is not valid.");
        }
    }
);

//@desc Current User
//@route GET /api/current
//@access public
const currentUser = ansyncHandler(
    async (req,res)=>{
        res.json(req.user);
    }
);


module.exports = {registerUser,loginUser,currentUser};