import jwt from "jsonwebtoken";

export class JWTGenerate {
  async userToken(data) {
    try {
      const { email, id, name } = data;
      const token = jwt.sign(
        {
          sub: id,
          email,
          name,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "14days",
        }
      );

      return token;
    } catch (err) {
      return err;
    }
  }

  async paymentOrderToken(products, method, orderId) {
    try {
      const token = jwt.sign(
        {
          orderId,
          products,
          method,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1m",
        }
      );

      return token;
    } catch (err) {
      return err;
    }
  }
}
