import axios from "axios";

const API_URL = "http://192.168.0.11:8000/api";
//const API_URL = "192.168.100.30:8000/api"; 
// Ejemplo:
// const API_URL = "http://192.168.1.100:8000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // tiempo máximo de espera (10 segundos)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});