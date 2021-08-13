import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { routes } from '../src/routes';
import { IGetMeResponse, ICurrentUser } from '../src/interfaces';
import { useRecoilState } from 'recoil';
import { getMeAtom } from '../src/recoil';

const Navbar = () => {
  const { isValidating, data, error } = useSWR<IGetMeResponse, Error>(
    routes.getMe,
  );

  const [getMe, setGetMe] = useRecoilState<ICurrentUser | null>(getMeAtom);

  useEffect(() => {
    if (data && data.success) {
      setGetMe(data.data);
    }
  }, [data]);

  console.log(' isValidating, data, error = ', isValidating, data, error);

  const guestLinks = (
    <Fragment>
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
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <Link href='/dashboard'>
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        <a href='#!'>Logout</a>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className='blue darken-4'>
        <div className='nav-wrapper'>
          <div className='container'>
            <Link href='/'>
              <a className='brand-logo'>FElixir</a>
            </Link>
            <ul className='right'>{getMe ? authLinks : guestLinks}</ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
