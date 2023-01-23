import express, {Express, NextFunction, Request, Response} from "express";
import morgan from "morgan";
import {noteRouter} from "./routes/notes.routes";
import bodyParser from "body-parser";
import createHttpError, {isHttpError} from "http-errors";


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/notes", noteRouter);
app.use((req, res, next) => {
    next(createHttpError.NotFound("This endpoint does not exist"));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = isHttpError(err) ? err.status : 500;

    res.status(status).json({
        msg: err.message,
    });
})


export default app;
