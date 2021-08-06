import 'materialize-css/dist/css/materialize.min.css';
import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const M = require('materialize-css');
    M.AutoInit();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
