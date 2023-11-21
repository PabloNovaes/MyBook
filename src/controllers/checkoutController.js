import { CheckoutRepository } from "../repositories/checkoutRepository.js";
import { JWTGenerate } from "../utils/jwt/jwt.js";
import Stripe from "stripe";

const checkoutRepository = new CheckoutRepository();
const jwtGenerate = new JWTGenerate();

export class CheckoutController {
  async setProductsToken(req, res) {
    try {
      const { products } = req.body;
      const orderProducts = await checkoutRepository.loadCheckoutProducts(
        products
      );

      const token = await jwtGenerate.paymentOrderToken(orderProducts);
      res.cookie("Products", token, { maxAge: 60000 }).end();
    } catch (error) {
      res.status(400).send();
    }
  }
  async initSession(req, res) {
    try {
      const { products } = req.products;

      const stripe = new Stripe(process.env.API_KEY, {
        apiVersion: "2023-10-16",
      });

      const checkout = await stripe.checkout.sessions.create({
        payment_method_types: ["boleto", "card"],
        mode: "payment",
        success_url: "http://192.168.0.174:5000/order-test",
        cancel_url: "http://192.168.0.174:5000/order-test",
        line_items: products.map((product) => {
          const { price, quantity, name, image } = product;
          return {
            price_data: {
              currency: "brl",
              product_data: {
                name,
                images: [image],
              },
              unit_amount: (price * 100).toFixed(0),
            },
            quantity,
          };
        }),
      });

      res.status(201).json(checkout);
    } catch (error) {
      res.status(400).json({ message: "Ocorreu um erro inesperado" });
    }
  }
}
