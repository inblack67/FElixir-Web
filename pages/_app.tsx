import 'materialize-css/dist/css/materialize.min.css';
import { Fragment, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const M = require('materialize-css');
    M.AutoInit();
  }, []);

  return (
    <Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
