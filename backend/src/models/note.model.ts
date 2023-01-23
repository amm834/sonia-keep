import {model, Schema} from "mongoose";

interface INote {
    title: string;
    body: string;
}

const NoteSchema = new Schema<INote>({
    title: {type: String, required: true,},
    body: {type: String, required: true,}
});


export const Note = model<INote>("Note", NoteSchema);

