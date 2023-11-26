import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import express from "express";
import cors from "cors";
import path from "path";

import { CheckoutController } from "./controllers/checkoutController.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const checkoutController = new CheckoutController()

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    req.body = data;
    next();
  });
});


app.post(
  "/checkout-succeded",
  checkoutController.updateOrderStatus
);

app.use((req, res, next) => {
  if (req.originalUrl == "/checkout-succeded") {
    // express.raw({ type: "application/json" })(req, res, next)
    next()
  } else (
    express.json()(req, res, next)
  )
})
app.use(routes);

app.use(express.static(path.join(__dirname, "app")));
app.set("views", path.join(__dirname, "app"));
app.set("view engine", "ejs");

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
