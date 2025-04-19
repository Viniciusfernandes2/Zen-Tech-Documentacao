import { Document, Types } from 'mongoose';

export interface IUserRepository<T extends Document> {
  create(user: Partial<T>): Promise<T>;
  find(limite?: number): Promise<T[]>;
  findOne(data: Types.ObjectId | string): Promise<T | null>;
  findOneByEmail(email: string): Promise<T | null>;
  findById(id: Types.ObjectId | string): Promise<T | null>;
  findByIdAndUpdate(id: Types.ObjectId | string, userData: Partial<T>, options?: { new: boolean }): Promise<T | null>;
  findByIdAndDelete(id: Types.ObjectId | string): Promise<Types.ObjectId | string | null | null>;
}
