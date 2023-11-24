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
app.use("/checkout-succeded", async (req, res, next) => {
  try {
    if (
      req.method === "POST" &&
      req.headers["content-type"] === "application/json"
    ) {
      req.bodyRaw = await getRawBody(req, {
        length: req.headers["content-length"],
        limit: "1mb",
        encoding: "utf-8",
      });

      next();
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

//webhook-route
app.post("/checkout-succeded", checkoutController.updateOrderStatus);
app.use(routes);

app.use(express.static(path.join(__dirname, "app")));
app.set("views", path.join(__dirname, "app"));
app.set("view engine", "ejs");

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
