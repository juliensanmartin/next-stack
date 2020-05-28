import { query as q } from 'faunadb';
import { serverClient, serializeFaunaCookie } from './utils/_fauna-auth';
import { NextApiRequest, NextApiResponse } from 'next';

type LoginResult = {
  secret: string;
};

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = await req.body;

  try {
    if (!email || !password) {
      throw new Error('Email and password must be provided.');
    }

    let user;

    try {
      user = await serverClient.query(
        q.Create(q.Collection('User'), {
          credentials: { password },
          data: { email },
        })
      );
    } catch (error) {
      throw new Error('User already exists.');
    }

    if (!user.ref) {
      throw new Error('No ref present in create query response.');
    }

    const loginRes: LoginResult = await serverClient.query(
      q.Login(user.ref, {
        password,
      })
    );

    if (!loginRes.secret) {
      throw new Error('No secret present in login query response.');
    }

    const cookieSerialized = serializeFaunaCookie(loginRes.secret);

    res.setHeader('Set-Cookie', cookieSerialized);
    res.status(200).end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}
