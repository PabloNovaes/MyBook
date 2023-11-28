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
      const { sub } = req.user;
      const orderProducts = await checkoutRepository.loadCheckoutProducts(
        products
      );

      const token = await jwtGenerate.paymentOrderToken(
        orderProducts,
        paymentMethod,
        orderId,
        sub
      );

      res
        .cookie("Order_token", token, { maxAge: 60000 })
        .status(201)
        .json({ created: true });
    } catch (error) {
      res.status(400).send();
    }
  }

  async initSession(req, res) {
    try {
      const { products, method, orderId, userId } = req.order;
      const pageUrl = process.env.STRIPE_PAGE_URL
      
      const checkout = await stripe.checkout.sessions.create({
        payment_method_types: [method],
        metadata: {
          orderId,
          userId,
          productsId: JSON.stringify(
            products.map((product) => {
              return product.id;
            })
          ),
        },
        mode: "payment",
        success_url: pageUrl,
        cancel_url: pageUrl,
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
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      return res.status(400).end();
    }

    const hookKey = process.env.STRIPE_WEBHOOK_KEY;
    const event = stripe.webhooks.constructEvent(req.body, signature, hookKey);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session["metadata"]["orderId"];
      const userId = session["metadata"]["userId"];
      const productsId = JSON.parse(session["metadata"]["productsId"]);

      Promise.allSettled([
        await checkoutRepository.updateOrderStatus(orderId),
        await checkoutRepository.removeItensToBag(productsId, userId),
      ]);
      res.status(200).json({ received: true });
    }
  }
}
