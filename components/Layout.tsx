import Head from 'next/head';
import Header from './Header';
import {
  mainBackgroundColor,
  headerFooterBackgroundColor,
  primary,
} from '../utils/colors';

function Layout(props) {
  return (
    <div className="app-container">
      <Head>
        <title>Next Stack</title>
      </Head>
      <Header />

      <main>
        <div className="container">{props.children}</div>
      </main>
      <footer>FOOTER HERE!</footer>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        html,
        body,
        body > div {
          height: 100%;
        }
        body {
          margin: 0;
          color: #333;
          font-size: 18px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        }
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .container {
          max-width: 65rem;
          margin: 1.5rem auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        main {
          overflow-y: scroll;
          flex: auto;
          background-color: ${mainBackgroundColor};
        }
        header,
        footer {
          flex: none;
          padding: 0.2rem;
          color: #fff;
          background-color: ${headerFooterBackgroundColor};
        }
        a,
        a:link,
        a:visited,
        a:focus,
        a:hover,
        a:active {
          color: white;
          text-decoration: none;
        }
        button {
          display: inline-block;
          padding: 0.5em 1em;
          border-radius: 0.2em;
          box-sizing: border-box;
          text-decoration: none;
          color: #ffffff;
          background-color: ${primary};
          text-align: center;
          position: relative;
          cursor: pointer;
          font: inherit;
          -webkit-appearance: button;
          border: none;
        }
        button:active {
          box-shadow: inset 0 0.6em 2em -0.3em rgba(0, 0, 0, 0.15),
            inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </div>
  );
}

export default Layout;
