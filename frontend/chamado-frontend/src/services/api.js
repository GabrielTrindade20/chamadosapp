import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/chamados",
});

export default api;