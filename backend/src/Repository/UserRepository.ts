import { User } from '../models/UserScheme';
import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  public async create(user: any): Promise<any> {
    return await User.create(user);
  }

  public async find(query: any = {}): Promise<any[]> {
    return await User.find(query);
  }

  public async findOne(query: any): Promise<any | null> {
    return await User.findOne(query);
  }

  public async updateOne(id: string, update: any): Promise<any> {
    return await User.updateOne({ _id: id }, update);
  }

  public async findByIdAndDelete(id: string): Promise<any | null> {
    return await User.findByIdAndDelete(id);
  }
}
