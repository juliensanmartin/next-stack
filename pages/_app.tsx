import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import AuthenticatedContext from '../utils/AuthenticationContext';

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, _setAuthenticated] = useState(false);

  useEffect(() => {
    const componentName = Component.prototype.constructor.name;
    if (!isAuthenticated && componentName !== 'Signup') {
      Router.push('/login');
    } else if (
      isAuthenticated &&
      (componentName === 'Signup' || componentName === 'Login')
    ) {
      Router.push('/');
    }
  }, [isAuthenticated, Component]);

  return (
    <AuthenticatedContext.Provider value={[isAuthenticated, _setAuthenticated]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthenticatedContext.Provider>
  );
}

export default MyApp;
