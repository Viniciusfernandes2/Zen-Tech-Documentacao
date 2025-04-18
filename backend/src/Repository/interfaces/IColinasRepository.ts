import { Document, Types } from 'mongoose';

export interface IColinasRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  find(limit?: number): Promise<T[]>;
  findByIdAndUpdate(id: Types.ObjectId | string, data: Partial<T>, options?: { new: boolean }): Promise<T | null>;
  findByIdAndDelete(id: Types.ObjectId | string): Promise<T | null>;
}