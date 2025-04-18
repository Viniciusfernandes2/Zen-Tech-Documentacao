export interface IUserRepository {
  create(user: any): Promise<any>;
  find(query?: any): Promise<any[]>;
  findOne(query: any): Promise<any | null>;
  updateOne(id: string, update: any): Promise<any>;
  findByIdAndDelete(id: string): Promise<any | null>;
}
