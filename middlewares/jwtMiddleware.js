const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    // console.log("Inside jwtMiddleware");

    // authorise user
    const token = req.headers["authorization"]?.split(" ")[1];
    if(token){
        // verify
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
            req.userId = jwtResponse.userId
            next()
        }catch(err) {
            // console.error("JWT Verify Error:", err);
            res.status(401).json("Authorization failed.. Please login")
        }
    }
    else{
        res.status(404).json("Authorization failed.. Token is Missing")
    }
}

module.exports = jwtMiddleware