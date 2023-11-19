import jwt from "jsonwebtoken";
import dayjs from "dayjs";

export default function tokenProducts(req, res, next) {
  const token = req.cookies.Products;
  if (!token) {
    return res.status(200).end();
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
        return res.send("Invalid Token")
    };
    
    const tokenExpiresIn = decode.exp;
    const unixCurrentDate = dayjs().unix();
    const testDate = tokenExpiresIn < unixCurrentDate;

    if (!testDate) {
      req.products = decode;
      next();
    }
  });
}
