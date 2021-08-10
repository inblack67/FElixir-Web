import React, { Fragment } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { routes } from '../src/routes';
import { fetcher } from '../src/fetcher';
import { IGetMeResponse } from '../src/interfaces';
import { NextPageContext } from 'next';

const Navbar = () => {
  const { isValidating, data, error } = useSWR<IGetMeResponse, Error>(
    routes.getMe,
  );

  console.log(' isValidating, data, error = ', isValidating, data, error);

  return (
    <Fragment>
      <nav className='blue darken-4'>
        <div className='nav-wrapper'>
          <div className='container'>
            <Link href='/'>
              <a className='brand-logo'>FElixir</a>
            </Link>
            <ul className='right'>
              <li>
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href='/register'>
                  <a>Register</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
