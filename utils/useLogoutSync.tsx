import { useEffect } from 'react';
import Router from 'next/router';

// Hook used around any authenticated page to logout automatically on every tabs
// when the user logout from 1 page
export const useLogoutSync = () => {
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

  return {};
};
