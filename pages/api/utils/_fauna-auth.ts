import faunadb from 'faunadb';
import cookie from 'cookie';

export const FAUNA_SECRET_COOKIE = 'faunaSecret';

// used in non-authed request (login, signup)
// connect to fauna with my own secret
export const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
});

// Used for any authed requests.
// connect to fauna using user connected token secret
export const faunaClient = (secret) =>
  new faunadb.Client({
    secret,
  });

export const serializeFaunaCookie = (userSecret, maxAge = 72576000) => {
  const cookieSerialized = cookie.serialize(FAUNA_SECRET_COOKIE, userSecret, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge,
    httpOnly: true,
    path: '/',
  });
  return cookieSerialized;
};
