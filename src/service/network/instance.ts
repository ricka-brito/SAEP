import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:8000/api";

export const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});