const NGROK_HOST = "";
const BASE_HOST = "https://my-book-delta.vercel.app";
const HOST = NGROK_HOST !== "" ? NGROK_HOST : BASE_HOST;

export default HOST;
