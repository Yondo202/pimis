import axios from "axios";

const instance = axios.create({
  // baseURL: "http://103.50.205.158:3000/api/",
  // baseURL: "http://192.168.88.78:3000/api/",
  // baseURL: "http://192.168.88.231:3000/api/",
  // baseURL: "http://124.158.107.34:3000/api/",
  baseURL: "http://localhost:3000/api/",
  // baseURL: "https://pimis.edp.mn/api/",
});

export default instance;

export const edplan = axios.create({
  baseURL: "https://pimis-plan.edp.mn/pimis-edplan/",
});

export const edplanFront = "https://pimis-plan.edp.mn";

export const FrontUrl = "http://localhost:3000"
// export const FrontUrl = "https://pimis.edp.mn"
