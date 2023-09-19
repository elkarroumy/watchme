import { createDecipheriv, createCipheriv, randomBytes } from 'crypto';
const algorithm = 'aes-256-cbc';
const key = randomBytes(32);
const iv = randomBytes(16);

export const encrypt = (text: string) => {
  let cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypt = (text: string) => {
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
