import { useState, useContext } from 'react';
import Router from 'next/router';
import AuthenticationContext from '../utils/AuthenticationContext';

function Signup() {
  const [, setAuthenticated] = useContext(AuthenticationContext);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    error: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData({ ...userData, error: '' });

    const { email, password } = userData;

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.status !== 200) {
        throw new Error(await response.text());
      }

      setAuthenticated(true);
      Router.push('/');
    } catch (error) {
      console.error(error);
      setUserData({ ...userData, error: error.message });
    }
  }

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>

        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={(event) =>
            setUserData({ ...userData, email: event.target.value })
          }
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={(event) =>
            setUserData({ ...userData, password: event.target.value })
          }
        />

        <button type="submit">Sign up</button>

        {userData.error && <p className="error">Error: {userData.error}</p>}
      </form>
      <style jsx>{`
        .signup {
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
      `}</style>
    </div>
  );
}

export default Signup;
