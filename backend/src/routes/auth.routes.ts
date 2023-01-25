import {Router} from "express";
import {login, register, me} from "../controllers/auth.controller";
import {validate} from "../middlewares/validate.middleware";
import {userLoginRequestSchema, userRequestSchema} from "../schemas";

export const authRouter: Router = Router();


authRouter
    .post('/register', validate(userRequestSchema), register)
    .post('/login', validate(userLoginRequestSchema), login)


