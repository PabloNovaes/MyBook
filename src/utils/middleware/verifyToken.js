import jwt from "jsonwebtoken";
import dayjs from "dayjs";

export default function verifyToken(req, res, next) {
  const token = req.cookies.Auth;
  if (!token) {
    setTimeout(() => {
      res.status(401).redirect("/login");
    }, 400);

    return;
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      res.send("token invalido!");
      return;
    }
    const tokenExpiresIn = decode.exp;
    const unixCurrentDate = dayjs().unix();
    const testDate = tokenExpiresIn < unixCurrentDate;

    if (!testDate) {
      req.user = decode;
      next();
    }
  });
}
