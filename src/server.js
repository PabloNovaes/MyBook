import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
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

// Remova o middleware global de timeout

// Middleware para verificar se é a rota "/checkout-succeded" e aplicar json parsing apenas para essa rota
app.use(
  "/checkout-succeded",
  express.json({ limit: "20mb" }),
  (req, res, next) => {
    checkoutController.updateOrderStatus(req, res, next);
  }
);

// Rota do webhook
app.post("/checkout-succeded", checkoutController.updateOrderStatus);

// Restante do middleware e configurações
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "app")));
app.set("views", path.join(__dirname, "app"));
app.set("view engine", "ejs");

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
