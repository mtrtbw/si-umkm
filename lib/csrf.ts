// lib/csrf.ts
import Tokens from 'csrf';
import { serialize } from 'cookie';

const tokens = new Tokens();

export function generateCSRFToken(secret: string) {
  return tokens.create(secret);
}

export function verifyCSRFToken(secret: string, token: string) {
  return tokens.verify(secret, token);
}

export function getOrCreateSecret(req: any, res: any) {
  const existing = req.cookies?.['csrf-secret'];
  if (existing) return existing;

  const secret = tokens.secretSync();
  res.setHeader(
    'Set-Cookie',
    serialize('csrf-secret', secret, {
      httpOnly: true,
      path: '/',
    })
  );
  return secret;
}
