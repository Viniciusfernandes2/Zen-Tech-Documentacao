import { Model, Types } from 'mongoose';
import Reserve, { IReserve } from '../models/ReserveSchema';
import { IReserveRepository } from './interfaces/IReserveRepository';

export class ReserveRepository implements IReserveRepository<IReserve> {
  private model: Model<IReserve>;

  constructor() {
    this.model = Reserve;
  }

  public async create(station: Partial<IReserve>): Promise<IReserve> {
    return await this.model.create(station);
  }

  public async find(): Promise<IReserve[]> {
    return await this.model.find().exec();
  }

  public async findByIdAndUpdate(
    id: Types.ObjectId | string,
    station: Partial<IReserve>,
    options = { new: true }
  ): Promise<IReserve | null> {
    return await this.model.findByIdAndUpdate(id, station, options).exec();
  }

  public async findByIdAndDelete(id: Types.ObjectId | string): Promise<IReserve | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  public async findById(id: Types.ObjectId | string): Promise<IReserve | null> {
    return await this.model.findById(id).exec();
  }
}