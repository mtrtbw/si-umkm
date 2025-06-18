import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyCSRFToken, getOrCreateSecret } from '@/lib/csrf';
import { parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.cookies = parse(req.headers.cookie || '');

  const token = req.headers['csrf-token'];
  const secret = getOrCreateSecret(req, res);

  if (typeof token !== 'string' || !verifyCSRFToken(secret, token)) {
    return res.status(403).json({ error: 'CSRF token invalid or missing' });
  }

  if (req.method === 'POST') {
    const { name, program } = req.body;
    console.log('✅ Diterima:', { name, program });
    return res.status(201).json({ message: 'Pendaftaran berhasil!' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
