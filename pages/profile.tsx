import cookie from 'cookie';
import Router from 'next/router';
import { useLogoutSync } from '../utils/useLogoutSync';
import { FAUNA_SECRET_COOKIE } from './api/utils/_fauna-auth';
// import { profileApi } from './api/profile';

function Profile() {
  useLogoutSync();

  return (
    <>
      <h1>Your user id is ...</h1>

      <style jsx>{`
        h1 {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
}

// Profile.getInitialProps = async (ctx) => {
//   if (typeof window === 'undefined') {
//     const { req, res } = ctx;
//     const cookies = cookie.parse(req.headers.cookie ?? '');
//     const faunaSecret = cookies[FAUNA_SECRET_COOKIE];

//     if (!faunaSecret) {
//       res.writeHead(302, { Location: '/login' });
//       res.end();
//       return {};
//     }

//     const profileInfo = await profileApi(faunaSecret);

//     return { userId: profileInfo };
//   }

//   const response = await fetch('/api/profile');

//   if (response.status === 401) {
//     Router.push('/login');
//     return {};
//   }
//   if (response.status !== 200) {
//     throw new Error(await response.text());
//   }

//   const data = await response.json();

//   return { userId: data.userId };
// };

export default Profile;
