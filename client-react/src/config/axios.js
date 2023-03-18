import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

export default instance;

// export default axios.create({
//   baseURL: baseURL
// });
//
// export const axiosJWT = axios.create({
//   baseURL: baseURL,
//   headers: {
//     "Authorization": "Bearer " + token
//   }
// })