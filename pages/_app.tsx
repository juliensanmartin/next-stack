import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import AuthenticatedContext from '../utils/AuthenticationContext';
import { useLogoutSync } from '../utils/useLogoutSync';

const nonProtectedRoutes = ['/login', '/signup'];

const needToRedirectedTo = (isAuthenticated: boolean, route: string) => {
  const isProtectedRouteNotAuthenticated: boolean =
    !isAuthenticated && !nonProtectedRoutes.includes(route);
  const isNonProtectedRouteAlreadyAuthenticated: boolean =
    isAuthenticated && nonProtectedRoutes.includes(route);
  if (isProtectedRouteNotAuthenticated) {
    return '/login';
  } else if (isNonProtectedRouteAlreadyAuthenticated) {
    return '/';
  } else {
    return undefined;
  }
};

function MyApp({ Component, pageProps, router }) {
  useLogoutSync();
  const [isAuthenticated, _setAuthenticated] = useState(false);

  useEffect(() => {
    const redirectTo = needToRedirectedTo(isAuthenticated, router.route);
    if (redirectTo) {
      Router.push(redirectTo);
    }
  }, [isAuthenticated, router]);

  return (
    <AuthenticatedContext.Provider value={[isAuthenticated, _setAuthenticated]}>
      <Layout>
        {needToRedirectedTo(isAuthenticated, router.route) ? (
          'LOADING...'
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </AuthenticatedContext.Provider>
  );
}

export default MyApp;
