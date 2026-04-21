import axios, { AxiosHeaders } from "axios";
import { getRentFlowTenantHeaders } from "@/src/lib/tenant";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const headers = AxiosHeaders.from(config.headers);

  for (const [key, value] of Object.entries(getRentFlowTenantHeaders())) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }

  config.headers = headers;
  return config;
});

export default api;
