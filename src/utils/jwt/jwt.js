import jwt from "jsonwebtoken";

export const generateToken = async (data) => {
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
};
