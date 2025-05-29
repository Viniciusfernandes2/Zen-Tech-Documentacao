import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "E-mail inválido!"] },
    password: { type: String, required: true, min: 5, max: 20 },
    role: { type: String, required: true, enum: ['user', 'visitor'], default: 'visitor' },
});

const User = mongoose.model("User", UserSchema, 'users');

export { User };
