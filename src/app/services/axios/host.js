const NGROK_HOST = "";
const BASE_HOST = "https://mybook-dun.vercel.app";
const HOST = NGROK_HOST !== "" ? NGROK_HOST : BASE_HOST;

export default HOST;
