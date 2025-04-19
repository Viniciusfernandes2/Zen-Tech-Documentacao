import { IUserDTO } from "./DTO/IUserDTO";

export interface IUserResponse {
  message?: string;
  user: IUserDTO;
}