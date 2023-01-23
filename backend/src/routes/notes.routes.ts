import {Router} from "express";
import {createNote, deleteNote, getAllNotes, getNoteById, updateNote} from "../controllers/note.controller";

const router = Router();

router
    .post('/', createNote)
    .get("/", getAllNotes)
    .get('/:id', getNoteById)
    .put("/:id", updateNote)
    .delete('/:id', deleteNote);

export {
    router as noteRouter
}