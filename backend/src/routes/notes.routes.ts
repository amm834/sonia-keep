import {Router} from "express";
import {createNote, deleteNote, getAllNotes, getNoteById, updateNote} from "../controllers/note.controller";
import {validate} from "../middlewares/validate.middleware";
import {notePartialSchema, noteRequestSchema} from "../schemas";

export const noteRouter = Router();

noteRouter
    .post('/', validate(noteRequestSchema), createNote)
    .get("/", getAllNotes)
    .get('/:id', getNoteById)
    .put("/:id", validate(notePartialSchema), updateNote)
    .delete('/:id', deleteNote);

