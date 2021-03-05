import axios from "axios";

const instance = axios.create({
  baseURL: "http://103.50.205.158:3000/api/",
  // baseURL: "http://192.168.88.78:3000/api/",
  
  // baseURL: "http://124.158.107.34:3000/api/",
});

export default instance;
