import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
  // baseURL: "http://103.50.205.158:3000/api/",
  baseURL: "http://192.168.88.78:3000/api/",
  
=======
  baseURL: "http://103.50.205.158:3000/api/",
  // baseURL: "http://192.168.88.78:3000/api/",
>>>>>>> 346bd038bfcbf763be2847116b60c2caaa02cb89
  // baseURL: "http://124.158.107.34:3000/api/",
  // baseURL: "http://192.168.88.231:3000/api/",
});

export default instance;
