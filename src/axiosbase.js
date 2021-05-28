import axios from "axios";

const instance = axios.create({
  // baseURL: "http://103.50.205.158:3000/api/",
  // baseURL: "http://192.168.88.78:3000/api/",
  // baseURL: "http://192.168.88.231:3000/api/",
  // baseURL: "http://124.158.107.34:3000/api/",
<<<<<<< HEAD
  baseURL: "http://localhost:3000/api/",
  // baseURL: "http://103.153.141.105/api/",
  // baseURL: "https://pimis.edp.mn/api/",
=======
  //baseURL: "http://localhost:3000/api/",
  baseURL: "https://pimis.edp.mn/api/",
>>>>>>> 3fbfd20546f6b4079526c9716283d353dba1f038
});

export default instance;
