import {UserSchema} from "../schemas";
import {model, Schema} from "mongoose";
import {hashPassword} from "../utils/bcrypt.util";


const userModelSchema = new Schema<UserSchema>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, email: true},
    password: {type: String, required: true, minlength: 6, select: false},
});


userModelSchema.pre("save", async function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        try {
            user.password = await hashPassword(user.password)
            return next()
        } catch (error) {
            return next(error)
        }
    } else {
        return next()
    }
});


export const User = model<UserSchema>("User", userModelSchema);

export const findUserByEmail = async (email: string) => await User.findOne({email})
