import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Layout from '../components/Layout';
import { requiredValidationMessage } from '../src/constants';
import { IRegister } from '../src/interfaces';
import { routes } from '../src/routes';

const Register = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        name: yup
          .string()
          .required(`Name ${requiredValidationMessage}`)
          .min(3)
          .max(30),
        email: yup
          .string()
          .email(`Email is not valid`)
          .required(`Email ${requiredValidationMessage}`),
        username: yup
          .string()
          .required(`Username ${requiredValidationMessage}`)
          .min(4)
          .max(30),
        password: yup
          .string()
          .required(`Password ${requiredValidationMessage}`)
          .min(8)
          .max(30),
      }),
    [],
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = async (data: IRegister) => {
    console.log('register form data => ', data);
    try {
      const res = await fetch(routes.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      console.log('handleRegister data = ', resData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container'>
      <p className='flow-text center grey-text'>Register</p>
      <div className='row'></div>
      <form
        className='col s12'
        onSubmit={handleSubmit(handleRegister)}
        autoComplete='off'
      >
        <div className='row'>
          <div className='input-field col s6'>
            <input
              id='name'
              type='text'
              className='validate'
              name='name'
              {...register('name')}
              placeholder='Enter your Name'
              // required
            />
            {errors.name && (
              <span className='helper-text red-text'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='input-field col s6'>
            <input
              id='email'
              // type='email'
              type='text'
              className='validate'
              name='email'
              {...register('email')}
              placeholder='Enter your Email'
              // required
            />
            {errors.email && (
              <span className='helper-text red-text'>
                {errors.email.message}
              </span>
            )}
          </div>
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
            {errors.password && (
              <span className='helper-text red-text'>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className='input-field col s6'>
            <button className='btn grey waves-effect waves-light' type='submit'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
