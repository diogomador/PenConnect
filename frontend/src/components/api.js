import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // backend FastAPI
});

export default api;

// TODO: Ajustar o CORS para produção
