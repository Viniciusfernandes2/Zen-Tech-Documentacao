import api from "../api/axios";

export async function tableReserv(startDate?: string, endDate?: string, startTime?: string, endTime?: string) {
  try {
    const response = await api.get("http://localhost:3006/geral", {
      params: { startDate, endDate, startTime, endTime }, // Envia os parâmetros de filtro
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do gráfico:", error);
    throw error;
  }
}

export async function tableColinas(startDate?: string, endDate?: string, startTime?: string, endTime?: string) {
  try {
    const response = await api.get("http://localhost:3006/geral", {
      params: { startDate, endDate, startTime, endTime }, // Envia os parâmetros de filtro
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do gráfico:", error);
    throw error;
  }
}