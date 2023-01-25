import {NextFunction, Request, Response} from "express";
import {findByEmail, User} from "../models/user.model";
import createHttpError from "http-errors";
import {comparePassword} from "../utils/bcrypt.util";
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({name, email, password});
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email}).select("+password");
        if (!user) {
            return next(createHttpError(401, "Invalid credentials"));
        }

        console.log(await findByEmail(email))

        const isMatch = await comparePassword(password, user.password)

        if (!isMatch) {
            return next(createHttpError(401, "Invalid credentials"));
        }

        const access_token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        return res.status(200).json({
            msg: "Login Success",
            access_token
        });
    } catch (error) {
        next(error);
    }
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const user = await User.findById(req.user._id);
        res.status(200).json({user});
    } catch (error) {
        next(error);
    }
}