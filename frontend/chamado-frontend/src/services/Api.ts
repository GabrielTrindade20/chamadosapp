import axios from "axios";

const api = axios.create({
  baseURL: "/api/chamados", // isso será redirecionado pelo NGINX ou proxy
});

export default api;

