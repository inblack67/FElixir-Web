import React from 'react';
import Layout from '../components/Layout';

const Login = () => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form submitting');
  };

  return (
    <Layout>
      <div className='container'>
        <p className='flow-text center grey-text'>Login</p>
        <div className='row'></div>
        <form className='col s12' onSubmit={handleLogin}>
          <div className='row'>
            <div className='input-field col s6'>
              <input id='username' type='text' className='validate' />
              <label htmlFor='username'>Username</label>
            </div>
            <div className='input-field col s6'>
              <input id='password' type='text' className='validate' />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input-field col s6'>
              <button
                className='btn grey waves-effect waves-light'
                type='submit'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
