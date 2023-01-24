import {AnyZodObject, ZodError} from "zod";
import {NextFunction, Request, Response} from "express";
import createHttpError from "http-errors";

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next()
    } catch (error) {
        if (error instanceof ZodError) {
            const message = error.issues.map(issue => issue.message)[0];
            return next(createHttpError(400, message));
        }
    }
}