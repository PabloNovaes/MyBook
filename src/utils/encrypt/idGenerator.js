import crypto from 'node:crypto'

export function generateBase62Id(length) {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const base = characters.length;

  let id = "";
  while (id.length < length) {
    const randomBytes = crypto.randomBytes(4);
    let randomNumber = 0;
    for (let i = 0; i < randomBytes.length; i++) {
      randomNumber = (randomNumber << 8) + randomBytes[i];
    }
    while (randomNumber > 0) {
      id += characters[randomNumber % base];
      randomNumber = Math.floor(randomNumber / base);
    }
  }

  return id.slice(0, length);
}

const id = generateBase62Id(28);
