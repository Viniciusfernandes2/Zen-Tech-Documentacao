import { Model, Types } from 'mongoose';
import Colinas, { IColinas } from '../models/ColinasScheme';
import { IColinasRepository } from './interfaces/IColinasRepository';

export class ColinasRepository implements IColinasRepository<IColinas> {
  private model: Model<IColinas>;

  constructor() {
    this.model = Colinas;
  }

  public async create(data: Partial<IColinas>): Promise<IColinas> {
    return await this.model.create(data);
  }

  public async find(limit: number): Promise<IColinas[]> {
    return await this.model.find().limit(limit).exec();
  }

  public async findByIdAndUpdate(
    id: Types.ObjectId | string,
    data: Partial<IColinas>,
    options = { new: true }
  ): Promise<IColinas | null> {
    return await this.model.findByIdAndUpdate(id, data, options).exec();
  }

  public async findByIdAndDelete(id: Types.ObjectId | string): Promise<IColinas | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}