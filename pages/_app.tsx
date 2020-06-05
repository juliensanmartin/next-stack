import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import AuthenticatedContext from '../utils/AuthenticationContext';
import { useLogoutSync } from '../utils/useLogoutSync';

const nonProtectedRoutes = ['Signup', 'Login'];

const needToRedirectedTo = (
  isAuthenticated: boolean,
  componentName: string
) => {
  const isProtectedRouteNotAuthenticated: boolean =
    !isAuthenticated && !nonProtectedRoutes.includes(componentName);
  const isNonProtectedRouteAlreadyAuthenticated: boolean =
    isAuthenticated && nonProtectedRoutes.includes(componentName);
  if (isProtectedRouteNotAuthenticated) {
    return '/login';
  } else if (isNonProtectedRouteAlreadyAuthenticated) {
    return '/';
  } else {
    return undefined;
  }
};

function MyApp({ Component, pageProps }) {
  useLogoutSync();
  const [isAuthenticated, _setAuthenticated] = useState(false);

  useEffect(() => {
    const componentName = Component.prototype.constructor.name;
    const redirectTo = needToRedirectedTo(isAuthenticated, componentName);
    if (redirectTo) {
      Router.push(redirectTo);
    }
  }, [isAuthenticated, Component]);

  const componentName = Component.prototype.constructor.name;

  return (
    <AuthenticatedContext.Provider value={[isAuthenticated, _setAuthenticated]}>
      <Layout>
        {needToRedirectedTo(isAuthenticated, componentName) ? (
          'LOADING...'
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </AuthenticatedContext.Provider>
  );
}

export default MyApp;
