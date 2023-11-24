import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import getRawBody from "raw-body";
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

//webhook-middleware

app.use("/checkout-succeded", (req, res, next) => {
  getRawBody(
    req,
    {
      length: req.headers["content-length"],
      limit: "1mb", // Defina um limite se necessário
      encoding: "utf-8", // Especifique a codificação, se aplicável
    },
    (err, string) => {
      if (err) return next(err);

      // O corpo bruto está disponível em `string`
      req.bodyRaw = string;

      // Continue o fluxo normal do middleware
      next();
    }
  );
});

//webhook-route
app.post("/checkout-succeded", checkoutController.updateOrderStatus);
app.use(routes);

app.use(express.static(path.join(__dirname, "app")));
app.set("views", path.join(__dirname, "app"));
app.set("view engine", "ejs");

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
