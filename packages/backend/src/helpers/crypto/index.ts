import { compare, hash } from 'bcrypt';

const salt = 10;

export const encrypt = async (text: string): Promise<string> => {
  return await hash(text, salt);
};

export const decrypt = async (encrypted: string, text: string): Promise<boolean> => {
  return await compare(encrypted, text);
};
