import api from "../api/axios";

export async function grafico(startDate?: string, endDate?: string, startTime?: string, endTime?: string) {
  try {
    const response = await api.get("http://localhost:3006/station", {
      params: { startDate, endDate, startTime, endTime }, // Envia os parâmetros de filtro
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do gráfico:", error);
    throw error;
  }
}