import 'materialize-css/dist/css/materialize.min.css';
import { Fragment, useEffect } from 'react';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const M = require('materialize-css');
    M.AutoInit();
  }, []);

  return (
    <Fragment>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </Fragment>
  );
}

export default MyApp;
