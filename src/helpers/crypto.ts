"use server";

import crypto from "crypto";

const key = Buffer.from(process.env.ENCRYPTION_KEY || "", 'base64');
const iv = Buffer.from(process.env.ENCRYPTION_IV || "", 'base64');

export const encrypt = (data: string) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypt = (encrypted: string) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};