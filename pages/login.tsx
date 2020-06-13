import { useState, useContext } from 'react';
import Link from 'next/link';
import AuthenticationContext from '../components/AuthenticationContext';

const signin = async (email, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.status !== 200) {
    throw new Error(await response.text());
  }
};

function Login() {
  const [, setAuthenticated] = useContext(AuthenticationContext);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    error: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData({ ...userData, error: '' });

    const email = userData.email;
    const password = userData.password;

    try {
      await signin(email, password);
      setAuthenticated(true);
    } catch (error) {
      console.error(error);
      setUserData({ ...userData, error: error.message });
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>

        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={(event) =>
            setUserData(
              Object.assign({}, userData, { email: event.target.value })
            )
          }
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={(event) =>
            setUserData(
              Object.assign({}, userData, { password: event.target.value })
            )
          }
        />

        <button type="submit">Login</button>
        <Link href="/signup" passHref>
          <a className="blue-link">Create an account</a>
        </Link>

        {userData.error && <p className="error">Error: {userData.error}</p>}
      </form>
      <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form {
          display: flex;
          flex-flow: column;
        }
        label {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
        .blue-link {
          color: blue;
        }
      `}</style>
    </div>
  );
}

export default Login;
