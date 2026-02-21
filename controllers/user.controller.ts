import {Request, Response} from "express";
import User from "../models/user.model";
import md5 from "md5";
export const register = async (req: Request, res: Response): Promise<void> => {
    const existEmail = await User.findOne({deleted: false, email: req.body.email});
    if(existEmail){
        res.json({
            code: 400,
            message: "email da ton tai"
        })
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.json({
        code: 200,
        message: "thanh cong",
        token: user.token
    })
}
export const login = async (req: Request, res: Response): Promise<void> => {
    const user = await User.findOne({deleted: false, email: req.body.email});
    if(!user){
        res.json({
            code: 400,
            message: "email khong ton tai"
        })
        return;
    }
    if(user.password !== md5(req.body.password)){
        res.json({
            code: 400,
            message: "sai mat khau"
        })
        return;
    }
    res.json({
        code: 200,
        message: "thanh cong",
        token: user.token
    })
}
export const infoUser = async ( req: Request, res: Response): Promise<void> => {
    res.json({
        code: 200,
        message: "thanh cong",
        data: req["user"]
    })
}