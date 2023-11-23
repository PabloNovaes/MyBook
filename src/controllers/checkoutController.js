import { CheckoutRepository } from "../repositories/checkoutRepository.js";
import { JWTGenerate } from "../utils/jwt/jwt.js";
import Stripe from "stripe";

const checkoutRepository = new CheckoutRepository();
const jwtGenerate = new JWTGenerate();

const stripe = new Stripe(process.env.API_KEY, {
  apiVersion: "2023-10-16",
});

export class CheckoutController {
  async setProductsToken(req, res) {
    try {
      const { products, paymentMethod, orderId } = req.body;
      const orderProducts = await checkoutRepository.loadCheckoutProducts(
        products
      );

      const token = await jwtGenerate.paymentOrderToken(
        orderProducts,
        paymentMethod,
        orderId
      );

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
      const { products, method, orderId } = req.products;

      const checkout = await stripe.checkout.sessions.create({
        payment_method_types: [method],
        metadata: {
          order_id: orderId,
        },
        mode: "payment",
        success_url:
          "https://b1c4-2804-388-c2ac-c683-472-3697-43c9-9f35.ngrok-free.app/profile",
        cancel_url:
          "https://b1c4-2804-388-c2ac-c683-472-3697-43c9-9f35.ngrok-free.app/profile",
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

  async updateOrderStatus(req, res) {
    let orderId;
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      return res.status(400).end();
    }

    const hooKey = process.env.STRIPE_WEBHOOK_KEY;
    const event = stripe.webhooks.constructEvent(req.body, signature, hooKey);

    console.log(event);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      orderId = session["metadata"].order_id;
    }

    res.json({ received: true });
  }
}
