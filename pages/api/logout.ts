import { query as q } from 'faunadb';
import cookie from 'cookie';
import {
  faunaClient,
  FAUNA_SECRET_COOKIE,
  serializeFaunaCookie,
} from './utils/_fauna-auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let cookieHeaders = '';
  if (req && req.headers && req.headers.cookie) {
    cookieHeaders = req.headers.cookie;
  }
  const cookies = cookie.parse(cookieHeaders);
  const faunaSecret = cookies[FAUNA_SECRET_COOKIE];
  if (!faunaSecret) {
    // Already logged out.
    return res.status(200).end();
  }
  // Invalidate secret (ie. logout from Fauna).
  await faunaClient(faunaSecret).query(q.Logout(false));
  // Clear cookie.
  const cookieSerialized = serializeFaunaCookie('', -1);
  res.setHeader('Set-Cookie', cookieSerialized);
  res.status(200).end();
}
