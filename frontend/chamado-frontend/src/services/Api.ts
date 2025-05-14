import axios from "axios";

const api = axios.create({
  baseURL: "https//localhost:8080/api/chamados", // nome do serviço no docker-compose
});



export default api;
