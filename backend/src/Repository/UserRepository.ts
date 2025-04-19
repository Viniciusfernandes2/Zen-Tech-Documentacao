import { Model, Types } from 'mongoose';
import User, { IUser } from '../models/UserScheme';
import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository<IUser> {
  private model: Model<IUser>;

  constructor() {
    this.model = User;
  }

  public async create(user: Partial<IUser>): Promise<IUser> {
    return await this.model.create(user);
  }

  public async find(): Promise<IUser[]> {
    return await this.model.find().exec();
  }

  public async findOne(id: Types.ObjectId | string): Promise<any | null> {
    return await this.model.findOne({ _id: id }).exec();
  }

  public async findOneByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email }).exec();
  }

  public async findById(id: Types.ObjectId | string): Promise<any | null> {
    return await this.model.findById(id).exec();
  }

  public async findByIdAndUpdate(id: Types.ObjectId | string, user: Partial<IUser>): Promise<any> {
    return await this.model.findByIdAndUpdate({ _id: id }, user, { new: true }).exec();
  }

  public async findByIdAndDelete(id: Types.ObjectId | string): Promise<Types.ObjectId | string | null> {
    return await this.model.findByIdAndDelete(id);
  }
}
