import crypto from "crypto";

export function generateAccountId(): string {
  return `ACC_${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

export function generateSecretToken(): string {
  return crypto.randomBytes(32).toString('hex');
}


