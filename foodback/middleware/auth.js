// import jwt from "jsonwebtoken"

// const authMiddleware = async (req,res,next) => {

//     const {token} = req.headers;
//     if(!token){
//         return res.json({success:false, message:"Not Authorised  , Login Again"})
//     }

//     try {
//         const token_decode =  jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json ({success:false, message:"Error"})
        
//     }
// }


// export default authMiddleware;



import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: "Not Authorised, Login Again" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export default authMiddleware;
