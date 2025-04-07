import api from "../api/axios";


export async function login(email: string, password: string) {
  try {
    const response = await api.post("/api/login", {
      email,
      password, 
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
