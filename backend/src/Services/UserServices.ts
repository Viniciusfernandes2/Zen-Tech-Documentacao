import bcrypt from 'bcrypt';
import { IUserRepository } from '../Repository/interfaces/IUserRepository';
import { IUser } from '../models/UserScheme';
import { UserResponse } from './Response/UserResponse';
import { IUserResponse } from './interfaces/IUserResponse';

export class UserServices {
  private userRepository: IUserRepository<IUser>;

  constructor(userRepository: IUserRepository<IUser>) {
    this.userRepository = userRepository;
  }

  public async login(email: string, password: string): Promise<IUserResponse | null> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      return { message: 'Usuário não encontrado.', user: null as any };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { message: 'Senha inválida.', user: null as any };
    }

    return UserResponse.userResponse(user, 'Login realizado com sucesso.');
  }

  public async createUser(user: Partial<IUser>): Promise<IUserResponse> {
    const hashedPassword = await bcrypt.hash(user.password as string, 10);
    const newUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return UserResponse.userResponse(newUser, 'Usuário criado com sucesso.');
  }

  public async getUsers(): Promise<IUserResponse[]> {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      return [];
    }
    return users.map((user) =>
      UserResponse.userResponse(user, 'Usuário encontrado com sucesso.')
    );
  }

  public async updateUser(id: string, userData: Partial<IUser>): Promise<IUserResponse> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const updatedUser = await this.userRepository.findByIdAndUpdate(id, userData);
    if (!updatedUser) {
      return { message: 'Usuário não encontrado.', user: null as any };
    }

    return UserResponse.userResponse(updatedUser, 'Usuário atualizado com sucesso.');
  }

  public async deleteUser(id: string): Promise<{ message: string }> {
    const deletedUser = await this.userRepository.findByIdAndDelete(id);
    if (!deletedUser) {
      return { message: 'Usuário não encontrado.' };
    }
    return { message: 'Usuário deletado com sucesso.' };
  }

  public async getUserById(id: string): Promise<IUserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return { message: 'Usuário não encontrado.', user: null as any };
    }
    return UserResponse.userResponse(user, 'Usuário encontrado com sucesso.');
  }
}