import { Model, Types } from 'mongoose';
import Station, { IStation } from '../models/StationScheme';
import { IStationRepository } from './interfaces/IStationRepository';

export class StationRepository implements IStationRepository<IStation> {
  private model: Model<IStation>;

  constructor() {
    this.model = Station;
  }

  public async create(station: Partial<IStation>): Promise<IStation> {
    return await this.model.create(station);
  }

  public async find(): Promise<IStation[]> {
    return await this.model.find().exec();
  }

  public async findByIdAndUpdate(
    id: Types.ObjectId | string,
    station: Partial<IStation>,
    options = { new: true }
  ): Promise<IStation | null> {
    return await this.model.findByIdAndUpdate(id, station, options).exec();
  }

  public async findByIdAndDelete(id: Types.ObjectId | string): Promise<IStation | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  public async findById(id: Types.ObjectId | string): Promise<IStation | null> {
    return await this.model.findById(id).exec();
  }
}