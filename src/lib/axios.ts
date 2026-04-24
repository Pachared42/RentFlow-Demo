import axios, { AxiosHeaders } from "axios";
import { getRentFlowTenantHeaders } from "@/src/lib/tenant";
import { getRentFlowApiBaseUrl } from "@/src/lib/runtime-api-url";

const api = axios.create({
  baseURL: getRentFlowApiBaseUrl(),
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const headers = AxiosHeaders.from(config.headers);
  config.baseURL = getRentFlowApiBaseUrl();

  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    headers.delete("Content-Type");
  }

  for (const [key, value] of Object.entries(getRentFlowTenantHeaders())) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }

  config.headers = headers;
  return config;
});

export default api;
