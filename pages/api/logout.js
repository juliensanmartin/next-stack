import { query as q } from 'faunadb';
import cookie from 'cookie';
import { faunaClient, FAUNA_SECRET_COOKIE } from './utils/_fauna-auth';

export default async function logout(req, res) {
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
  const cookieSerialized = cookie.serialize(FAUNA_SECRET_COOKIE, '', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    httpOnly: true,
    path: '/',
  });
  res.setHeader('Set-Cookie', cookieSerialized);
  res.status(200).end();
}
