const NGROK_HOST = "";
const BASE_HOST = "http://192.168.0.174:5500";
const HOST = NGROK_HOST !== "" ? NGROK_HOST : BASE_HOST;

export default HOST;
