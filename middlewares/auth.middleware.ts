import {Request, Response, NextFunction} from "express";
import User from "../models/user.model";
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        const user = await User.findOne({deleted: false, token: token});
        if(!user){
            res.json({
                code: 401,
                message: "Unauthorized"
            })
            return;
        }
        req["user"] = user;
        next();
    }else{
        res.json({
            code: 401,
            message: "Unauthorized"
        })
    }
}