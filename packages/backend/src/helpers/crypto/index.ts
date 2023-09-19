import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { CRYPTO } from '../../common/constants';

const algorithm = CRYPTO.ALGORITHM;
const key = randomBytes(32);
const iv = randomBytes(16);

export const encrypt = (text: string): string => {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + encrypted;
};

export const decrypt = (encryptedText: string): string => {
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText.slice(32), 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
