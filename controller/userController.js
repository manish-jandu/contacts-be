const ansyncHandler = require("express-async-handler");

//@desc Register New User
//@route POST /api/register
//@access public
const registerUser = ansyncHandler(
    async (req,res)=>{
        res.status(200).json({message:"Register the user"});
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