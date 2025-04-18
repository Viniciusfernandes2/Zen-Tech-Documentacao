import { IStationRepository } from '../Repository/interfaces/IStationRepository';
import { IStation } from '../models/StationScheme';
import { StationResponse } from './Response/StationResponse';
import { IStationDTO } from './interfaces/DTO/IStationDTO';
import { IStationResponse } from './interfaces/IStationResponse';

export class StationService {
  private stationRepository: IStationRepository<IStation>;

  constructor(stationRepository: IStationRepository<IStation>) {
    this.stationRepository = stationRepository;
  }

  public async createStation(stationData: Partial<IStation>): Promise<IStationResponse> {
    const newStation = await this.stationRepository.create(stationData);
    return StationResponse.stationResponse(newStation, 'Estação criada com sucesso.');
  }

  public async getStations(): Promise<IStationResponse[]> {
    const stations = await this.stationRepository.find();
    if (stations.length === 0) {
      return [];
    }
    return stations.map((station) => StationResponse.stationResponse(station));
  }

  public async updateStation(
    id: string,
    stationData: Partial<IStation>
  ): Promise<IStationResponse> {
    const updatedStation = await this.stationRepository.findByIdAndUpdate(id, stationData);
    if (!updatedStation) {
      return { message: 'Estação não encontrada.', IStationDTO: null as any };
    }
    return StationResponse.stationResponse(updatedStation, 'Estação atualizada com sucesso.');
  }

  public async deleteStation(id: string): Promise<void | { message: string }> {
    const existingStation = await this.stationRepository.findByIdAndDelete(id);
    if (!existingStation) {
      return { message: 'Estação não encontrada.' };
    }
  }

}