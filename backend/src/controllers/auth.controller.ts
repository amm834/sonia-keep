import {NextFunction, Request, Response} from "express";
import {User} from "../models/user.model";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({name, email, password});
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const login = (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    try {
        res.json(email)
    } catch (error) {
        next(error);
    }
}