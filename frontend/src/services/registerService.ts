import api from "../api/axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  numero: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const response = await api.post("/signup", data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", error.response?.data || error.message);
    throw error.response?.data || { message: "Erro ao registrar usuário" };
  }
}