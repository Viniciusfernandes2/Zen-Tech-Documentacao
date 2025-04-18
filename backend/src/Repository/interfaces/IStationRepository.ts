import { Document, Types } from 'mongoose';

export interface IStationRepository<T extends Document> {
  create(station: Partial<T>): Promise<T>;
  find(limit?: number): Promise<T[]>;
  findByIdAndUpdate(id: Types.ObjectId | string, station: Partial<T>, options?: { new: boolean }): Promise<T | null>;
  findByIdAndDelete(id: Types.ObjectId | string): Promise<T | null>;
}