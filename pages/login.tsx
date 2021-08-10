import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Layout from '../components/Layout';
import { requiredValidationMessage } from '../src/constants';
import { ILogin } from '../src/interfaces';
import { routes } from '../src/routes';

const Login = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup
          .string()
          .required(`Username ${requiredValidationMessage}`),
        password: yup
          .string()
          .required(`Password ${requiredValidationMessage}`),
      }),
    [],
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data: ILogin) => {
    console.log('login form data => ', data);
    try {
      const res = await fetch(routes.login, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      console.log('handle login data = ', resData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className='container'>
        <p className='flow-text center grey-text'>Login</p>
        <div className='row'></div>
        <form
          className='col s12'
          onSubmit={handleSubmit(handleLogin)}
          autoComplete='off'
        >
          <div className='row'>
            <div className='input-field col s6'>
              <input
                id='username'
                type='text'
                className='validate'
                name='username'
                {...register('username')}
                placeholder='Enter your Username'
                // required
              />
              {/* <label
                htmlFor='username'
                className={`${errors.username ? 'red-text' : ''}`}
              >
                Username
              </label> */}
              {errors.username && (
                <span className='helper-text red-text'>
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className='input-field col s6'>
              <input
                id='password'
                type='password'
                className='validate'
                name='password'
                {...register('password')}
                placeholder='Enter your Password'
                // required
              />
              {/* <label
                htmlFor='password'
                className={`${errors.password ? 'red-text' : ''}`}
              >
                Password
              </label> */}
              {errors.password && (
                <span className='helper-text red-text'>
                  {errors.password.message}
                </span>
              )}
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
  );
};

export default Login;
