import axios from "axios";

const instance = axios.create({
  // baseURL: "http://103.50.205.158:3000/api/",
  // baseURL: "http://192.168.88.78:3000/api/",
  // baseURL: "http://192.168.88.231:3000/api/",
  // baseURL: "http://124.158.107.34:3000/api/",
  //baseURL: "http://localhost:3000/api/",
  baseURL: "https://pimis.edp.mn/api/",
});

export default instance;

export const edplan = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:1337/pimis-edplan/",
});
=======
  baseURL: "http://localhost:1337/",
});
>>>>>>> 4e7999cfdbdbe77eaaadc8052e7019125fd45a18
