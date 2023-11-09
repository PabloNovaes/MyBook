export default function verifyauthState(req, res, next) {
  const token = req.cookies.Auth;

  if (!token) {
    return next();
  }

  res.redirect("/");
}
