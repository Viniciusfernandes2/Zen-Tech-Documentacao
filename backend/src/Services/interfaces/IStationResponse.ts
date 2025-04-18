import { IStationDTO } from "./DTO/IStationDTO";

export interface IStationResponse {
  message?: string;
  IStationDTO: IStationDTO;
}
