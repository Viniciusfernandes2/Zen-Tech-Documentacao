// services/tableFurnas.ts
import api from "../api/axios";

export async function buscarDadosFurnas(
  startDate?: string,
  endDate?: string,
  startTime?: string,
  endTime?: string
) {
  try {
    const response = await api.get("http://localhost:3006/furnas", {
      params: { startDate, endDate, startTime, endTime },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da estação Furnas:", error);
    throw error;
  }
}
