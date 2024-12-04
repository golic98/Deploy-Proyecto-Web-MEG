import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:1200/meg",
    withCredentials: true
});

export default instance;