import { CheckoutRepository } from "../repositories/checkoutRepository.js";
import { JWTGenerate } from "../utils/jwt/jwt.js";
import Stripe from "stripe";

const checkoutRepository = new CheckoutRepository();
const jwtGenerate = new JWTGenerate();

export class CheckoutController {
  async setProductsToken(req, res) {
    try {
      const { products, paymentMethod } = req.body;
      const orderProducts = await checkoutRepository.loadCheckoutProducts(
        products
      );

      const token = await jwtGenerate.paymentOrderToken(orderProducts, paymentMethod);

      res
        .cookie("Products", token, { maxAge: 60000 })
        .status(201)
        .json({ created: true });
    } catch (error) {
      res.status(400).send();
    }
  }
  async initSession(req, res) {
    try {
      const { products, method } = req.products;

      const stripe = new Stripe(process.env.API_KEY, {
        apiVersion: "2023-10-16",
      });

      const checkout = await stripe.checkout.sessions.create({
        payment_method_types: [method],
        mode: "payment",
        success_url: "http://192.168.43.141:5000/profile",
        cancel_url: "http://192.168.43.141:5000/profile",
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
