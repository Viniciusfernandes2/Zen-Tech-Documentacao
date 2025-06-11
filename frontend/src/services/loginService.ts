import api from "../api/axios";

interface LoginResponse {
  token: string;
  name: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("http://localhost:3006/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Falha ao tentar fazer login");
  }
}

