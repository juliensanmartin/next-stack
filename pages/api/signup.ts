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

    const user: any = await serverClient.query(
      q.Create(q.Collection('Users'), {
        credentials: { password },
        data: { email },
      })
    );

    console.log(user);

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
    console.log(loginRes);

    res.setHeader('Set-Cookie', cookieSerialized);
    res.status(200).end();
  } catch (error) {
    throw new Error('User already exists.');
    res.status(400).send(error.message);
  }
}
