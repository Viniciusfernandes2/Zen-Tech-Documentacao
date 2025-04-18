import { IColinasRepository } from '../Repository/interfaces/IColinasRepository';
import { IColinas } from '../models/ColinasScheme';
import { ColinasResponse } from './Response/ColinasResponse';
import { IColinasResponse } from './interfaces/IColinasResponse';

export class ColinasServices {
  private colinasRepository: IColinasRepository<IColinas>;

  constructor(colinasRepository: IColinasRepository<IColinas>) {
    this.colinasRepository = colinasRepository;
  }

  public async createColinas(colinas: Partial<IColinas>): Promise<IColinasResponse> {
    const newColinas = await this.colinasRepository.create(colinas);
    return ColinasResponse.colinasResponse(newColinas, 'Colina criada com sucesso.');
  }

  public async getColinas(): Promise<IColinasResponse[]> {
    const colinasList = await this.colinasRepository.find();
    if (colinasList.length === 0) {
      return [];
    }
    return colinasList.map((colinas) => ColinasResponse.colinasResponse(colinas, 'Colinas encontrados com sucesso.'));
  }

  public async updateColinas(
    id: string,
    colinas: Partial<IColinas>
  ): Promise<IColinasResponse> {
    const updatedColinas = await this.colinasRepository.findByIdAndUpdate(id, colinas, { new: true });
    if (!updatedColinas) {
      return { message: 'Colina não encontrada.', IColinasDTO: null as any };
    }
    return ColinasResponse.colinasResponse(updatedColinas, 'Colina atualizada com sucesso.');
  }

  public async deleteColinas(id: string): Promise<void | { message: string }> {
    const existingColinas = await this.colinasRepository.findByIdAndDelete(id);
    if (!existingColinas) {
      return { message: 'Colina não encontrada.' };
    }
  }
}

