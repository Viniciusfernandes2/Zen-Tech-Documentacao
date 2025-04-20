import { IReserveDTO } from "./DTO/IReserveDTO";

export interface IReserveResponse {
  message?: string;
  IStationDTO: IReserveDTO;
}
