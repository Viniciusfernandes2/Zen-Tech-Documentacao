import { IReserveRepository } from '../Repository/interfaces/IReserveRepository';
import { IReserve } from '../models/ReserveSchema';
import { ReserveResponse } from './Response/ReserveResponse';
import { IReserveResponse } from './interfaces/IReserveResponse';

export class ReserveService {
  private stationRepository: IReserveRepository<IReserve>;

  constructor(stationRepository: IReserveRepository<IReserve>) {
    this.stationRepository = stationRepository;
  }

  public async createStation(stationData: Partial<IReserve>): Promise<IReserveResponse> {
    const newStation = await this.stationRepository.create(stationData);
    return ReserveResponse.stationResponse(newStation, 'Estação criada com sucesso.');
  }

  public async getStations(): Promise<IReserveResponse[]> {
    const stations = await this.stationRepository.find();
    if (stations.length === 0) {
      return [];
    }
    return stations.map((station) => ReserveResponse.stationResponse(station));
  }

  public async updateStation(
    id: string,
    stationData: Partial<IReserve>
  ): Promise<IReserveResponse> {
    const updatedStation = await this.stationRepository.findByIdAndUpdate(id, stationData);
    if (!updatedStation) {
      return { message: 'Estação não encontrada.', IStationDTO: null as any };
    }
    return ReserveResponse.stationResponse(updatedStation, 'Estação atualizada com sucesso.');
  }

  public async deleteStation(id: string): Promise<void | { message: string }> {
    const existingStation = await this.stationRepository.findByIdAndDelete(id);
    if (!existingStation) {
      return { message: 'Estação não encontrada.' };
    }
  }

  public async getStationById(id: string): Promise<IReserveResponse> {
    const station = await this.stationRepository.findById(id);
    if (!station) {
      return { message: 'Estação não encontrada.', IStationDTO: null as any };
    }
    return ReserveResponse.stationResponse(station, 'Estação encontrada com sucesso.');
  }

}