import {Note} from "../models/note.model";

export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find();
        res.json({notes});
    } catch (err) {
        next(err);
    }
}


export const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        res.json({note});
    } catch (err) {
        next(err);
    }
}

export const createNote = async (req, res, next) => {
    try {
        const {title, body} = req.body;

        const note = await Note.create({title, body});
        res.json({note});
    } catch (err) {
        next(err);
    }
}

export const updateNote = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, body} = req.body;

        const note = await Note.findByIdAndUpdate(id, {title, body}, {new: true});
        res.json({note});
    } catch (err) {
        next(err);
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        res.json({note});
    } catch (err) {
        next(err);
    }
}