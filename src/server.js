import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import timeout from "connect-timeout";
import express from "express";
import cors from "cors";
import path from "path";
import { CheckoutController } from "./controllers/checkoutController.js";

const checkoutController = new CheckoutController();

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//webhook-route
app.post(
  "/checkout-succeded",
  express.raw({ type: "application/json" }),
  checkoutController.updateOrderStatus
);
app.use(routes);

app.use(express.static(path.join(__dirname, "app")));
app.set("views", path.join(__dirname, "app"));
app.set("view engine", "ejs");

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
