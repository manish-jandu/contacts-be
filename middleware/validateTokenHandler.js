const ansyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = ansyncHandler(async (req,res,next) => {
        let token;
        let authHeader = req.headers.authorization || req.headers.Authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded) => {
                if(err){
                    res.status(401);
                    throw new Error("User is not Authorized");
                }
                req.user = decoded.User;
                next();
            });
            if(!token){
                res.status(401);
                throw new Error("User is not Authorized");
            }
        } else {
            res.status(401);
            throw new Error("User is not Authorized");
        }
    }
) ;

module.exports = validateToken;  