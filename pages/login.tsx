import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, TypeOptions } from 'react-toastify';
import { mutate } from 'swr';

import { requiredValidationMessage } from '../src/constants';
import { IAcknowledgementResponse, ILogin } from '../src/interfaces';
import { routes } from '../src/routes';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { getMeAtom } from '../src/recoil';

const Login = () => {
  const router = useRouter();

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

  const getMe = useRecoilValue(getMeAtom);

  console.log('getMe = ', getMe);

  useEffect(() => {
    if (getMe) {
      router.replace('/dashboard');
    }
  }, [getMe]);

  const notify = (text: string, type: TypeOptions) =>
    toast(text, {
      type,
    });

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

      const resData: IAcknowledgementResponse = await res.json();
      console.log('handle login data = ', resData);

      if (resData.success) {
        notify(resData.message, 'info');
        await mutate(routes.getMe);
        router.push('/dashboard');
      } else if (resData.errors) {
        notify(resData.errors.toString(), 'error');
      }
    } catch (err) {
      console.error(err);
      const caughtError: Error = err;
      notify(caughtError.message, 'error');
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
              className='btn grey darken-3 waves-effect waves-light'
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
