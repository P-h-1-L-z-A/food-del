import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const adminAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorised. Admin login required." })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(token_decode.id);

        if (!user || !user.isAdmin) {
            return res.json({ success: false, message: "Not Authorised. Admin access only." })
        }

        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export default adminAuth;
