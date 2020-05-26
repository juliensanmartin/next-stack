import { useEffect } from 'react';
import Router from 'next/router';

export const login = () => {
  Router.push('/profile');
};

// used when we logout from a React component
export const logout = async () => {
  await fetch('/api/logout');

  // this is to allow withAuthSync to be notified of user logs out
  window.localStorage.setItem('logout', Date.now());

  Router.push('/login');
};

// HOC used around any authenticated page to logout automatically on every tabs
// when the user logout from 1 page
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        Router.push('/login');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
