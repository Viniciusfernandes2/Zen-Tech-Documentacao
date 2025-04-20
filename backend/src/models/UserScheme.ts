import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  role?: string;
  email: string;
  password: string;
  numero: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    reqyuired: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'E-mail inválido!'],
  },
  password: { type: String, required: true, min: 5, max: 20 },
  numero: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\d{11}$/,
      'Número de telefone inválido! Deve conter exatamente 11 dígitos.',
    ],
  },
});

const User = model<IUser>('User', UserSchema, 'users');

export default User;
