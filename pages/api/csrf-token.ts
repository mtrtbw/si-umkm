import type { NextApiRequest, NextApiResponse } from 'next';
import { generateCSRFToken, getOrCreateSecret } from '@/lib/csrf';
import { parse } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.cookies = parse(req.headers.cookie || '');
  const secret = getOrCreateSecret(req, res);
  const token = generateCSRFToken(secret);
  return res.status(200).json({ csrfToken: token });
}
