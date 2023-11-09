const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const testEmail = (email) => {
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
};

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*\.]).{7,}$/

export const testPassword = (senha) => {
  return passwordRegex.test(senha);
};

export function verifyPassword(senha, caracter, lowercase, uppercase) {
  const possuiMinuscula = /[a-z]/.test(senha);
  lowercase.style.color = possuiMinuscula ? "yellowgreen" : "tomato";

  const possuiMaiuscula = /[A-Z]/.test(senha);
  uppercase.style.color = possuiMaiuscula ? "yellowgreen" : "tomato";

  const possuiCaractereEspecial =
    /[!@#$%^&*$>\.]/.test(senha) && senha.length >= 7;
  caracter.style.color = possuiCaractereEspecial ? "yellowgreen" : "tomato";

  return possuiMinuscula, possuiMaiuscula, possuiCaractereEspecial;
}
