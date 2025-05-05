import api from "../api/axios";

export async function graficoReserv(startDate?: string, endDate?: string, startTime?: string, endTime?: string) {
  try {
    const response = await api.get("http://localhost:3006/station", {
      params: { startDate, endDate, startTime, endTime }, // Envia os parâmetros de filtro corretamente
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do gráfico (Reservatório):", error);
    throw error;
  }
}

export async function graficoColinas(startDate?: string, endDate?: string, startTime?: string, endTime?: string) {
  try {
    const response = await api.get("http://localhost:3006/colinas", {
      params: { startDate, endDate, startTime, endTime }, // Envia os parâmetros de filtro corretamente
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do gráfico (Colinas):", error);
    throw error;
  }
}