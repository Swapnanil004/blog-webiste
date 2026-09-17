import axios from "axios";

const api = axios.create({
    baseURL: "https://blog-webiste-1.onrender.com/api",
});

export default api;