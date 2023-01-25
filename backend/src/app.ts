import express, {Express, NextFunction, Request, Response} from "express";
import morgan from "morgan";
import {noteRouter} from "./routes/notes.routes";
import bodyParser from "body-parser";
import createHttpError, {isHttpError} from "http-errors";
import {authRouter} from "./routes/auth.routes";


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/notes", noteRouter);
app.use("/api/auth", authRouter);


app.use((req, res, next) => {
    next(createHttpError.NotFound("This endpoint does not exist"));
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const status = isHttpError(error) ? error.status : 500;

    res.status(status).json({
        status,
        msg: error.message,
        error,
    });
})


export default app;