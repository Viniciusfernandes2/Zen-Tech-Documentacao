import { IStationRepository } from '../Repository/interfaces/IStationRepository';
import { IReserve } from '../models/ReserveSchema';
import { StationResponse } from './Response/StationResponse';
import { IStationResponse } from './interfaces/IStationResponse';

export class StationService {
  private stationRepository: IStationRepository<IReserve>;

  constructor(stationRepository: IStationRepository<IReserve>) {
    this.stationRepository = stationRepository;
  }

  public async createStation(stationData: Partial<IReserve>): Promise<IStationResponse> {
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
    stationData: Partial<IReserve>
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

  public async getStationById(id: string): Promise<IStationResponse> {
    const station = await this.stationRepository.findById(id);
    if (!station) {
      return { message: 'Estação não encontrada.', IStationDTO: null as any };
    }
    return StationResponse.stationResponse(station, 'Estação encontrada com sucesso.');
  }

}