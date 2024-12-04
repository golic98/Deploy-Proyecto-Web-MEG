import axios from "axios";

const instance = axios.create({
    baseURL: "http://44.207.4.141/1200/meg",
    withCredentials: true
});

export default instance;