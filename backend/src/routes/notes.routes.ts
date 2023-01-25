import {Router} from "express";
import {createNote, deleteNote, getAllNotes, getNoteById, updateNote} from "../controllers/note.controller";
import {validate} from "../middlewares/validate.middleware";
import {notePartialSchema, noteRequestSchema} from "../schemas";
import passport from "passport";


export const noteRouter: Router = Router();

const requiredAuth = passport.authenticate('jwt', {session: false});

noteRouter
    .post('/', requiredAuth, validate(noteRequestSchema), createNote)
    .get("/:userId", requiredAuth, getAllNotes)
    .get('/:id/note', requiredAuth, getNoteById)
    .put("/:id/note", requiredAuth, validate(notePartialSchema), updateNote)
    .delete('/:id/note', requiredAuth, deleteNote);
