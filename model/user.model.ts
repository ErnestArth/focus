import { Schema, models, model } from "mongoose";


const UserSchema = new Schema({
    clerkId: { type: String },
    firstName: { type: String ,required:false},
    lastName: { type: String,reqired:false},
    image: {type: String, required : false},
    userName: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    date: { type: Date, default: Date.now },
})

const User = models.User || model("User", UserSchema)
export default User