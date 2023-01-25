import {Note} from "../models/note.model";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import {findUserByEmail} from "../models/user.model";

export const getAllNotes = async (req, res, next) => {
    const {userId} = req.params;
    try {
        // get all note by user
        const notes = await Note.find({user: userId});
        res.json({notes});
    } catch (err) {
        next(err);
    }
}

export const getNoteById = async (req, res, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, "Invalid ID"));

    try {
        const note = await Note.findOne({_id: id})
        res.json({note});
    } catch (error) {
        next(error);
    }
}

export const createNote = async (req, res, next) => {
    const {title, body, user_id} = req.body;

    try {
        const note = await Note.create({title, body, user: user_id});
        res.json({note});
    } catch (error) {
        next(error);
    }
}

export const updateNote = async (req, res, next) => {
    const {id} = req.params;
    const {title, body} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, "Invalid ID"));

    try {
        const note = await Note.findByIdAndUpdate(id, {title, body}, {new: true});
        res.json({note});
    } catch (error) {
        next(error);
    }
}

export const deleteNote = async (req, res, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return next(createHttpError(400, "Invalid ID"));

    try {
        const note = await Note.findByIdAndDelete(id);
        res.json({note});
    } catch (error) {
        next(error);
    }
}