import Head from 'next/head';
import Header from './Header';

function Layout(props) {
  return (
    <>
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
        body {
          margin: 0;
          color: #333;
          font-size: 18px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        }
        .container {
          max-width: 65rem;
          margin: 1.5rem auto;
          padding-left: 1rem;
          padding-right: 1rem;
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
      `}</style>
    </>
  );
}

export default Layout;
