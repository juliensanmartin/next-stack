import { useContext } from 'react';
import Link from 'next/link';
import AuthenticationContext from '../utils/AuthenticationContext';

function Header() {
  const [, setAuthenticated] = useContext(AuthenticationContext);

  const logout = async () => {
    await fetch('/api/logout');
    setAuthenticated(false);

    // this is to allow withAuthSync to be notified of user logs out
    window.localStorage.setItem('logout', Date.now().toString());
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
}

export default Header;
