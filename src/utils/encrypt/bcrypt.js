import bcrypt from "bcrypt";

export const hashedPass = (pass) => {
  if (!pass) {
    return null;
  }
  const password = bcrypt.hash(pass, 8);
  return password;
};

export const comparePasswords = async (encrypted, current) => {
  if (!current) {
    return null;
  }
  const password = await bcrypt.compare(current, encrypted);
  return password;
};
