import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "E-mail inválido!"] },
    password: { type: String, required: true, min: 5, max: 20 },
    numero: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{11}$/, "Número de telefone inválido! Deve conter exatamente 11 dígitos."]
    },
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" }
});

const User = mongoose.model("User", UserSchema, 'users');

export { User };
