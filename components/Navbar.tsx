import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import { routes } from '../src/routes';
import {
  IGetMeResponse,
  ICurrentUser,
  IAcknowledgementResponse,
} from '../src/interfaces';
import { useRecoilState } from 'recoil';
import { getMeAtom } from '../src/recoil';
import { toast, TypeOptions } from 'react-toastify';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const { isValidating, data, error } = useSWR<IGetMeResponse, Error>(
    routes.getMe,
  );

  const [getMe, setGetMe] = useRecoilState<ICurrentUser | null>(getMeAtom);

  useEffect(() => {
    if (!isValidating && data && data.success) {
      setGetMe(data.data);
    } else {
      setGetMe(null);
    }
  }, [data, isValidating]);

  useEffect(() => {
    if (error) {
      setGetMe(null);
    }
  }, [error]);

  const notify = (text: string, type: TypeOptions) =>
    toast(text, {
      type,
    });

  console.log(' isValidating, data, error = ', isValidating, data, error);

  const handleLogout = async (
    _e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    try {
      const res = await fetch(routes.logout, {
        method: 'DELETE',
        credentials: 'include',
      });

      const resData: IAcknowledgementResponse = await res.json();

      if (resData.success) {
        notify(resData.message, 'info');
        await mutate(routes.getMe);
        router.push('/login');
      } else if (resData.errors) {
        notify(resData.errors.toString(), 'error');
      }
    } catch (err) {
      console.error(err);
      const caughtError: Error = err;
      notify(caughtError.message, 'error');
    }
  };

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
      <li onClick={handleLogout}>
        <a href='#!'>Logout</a>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className='navbar'>
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
