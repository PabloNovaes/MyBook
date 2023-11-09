import host from "../../services/axios/host.js";

export default axios.create({
  baseURL: host,
  headers: {
    "Content-type": "application/json",
  },
});
