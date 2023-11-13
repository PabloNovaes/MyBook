const NGROK_HOST = "";
const BASE_HOST = "http://localhost:5000";
const HOST = NGROK_HOST !== "" ? NGROK_HOST : BASE_HOST;

export default HOST;
