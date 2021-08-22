import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { getMeAtom } from '../src/recoil';

const Dashboard = () => {
  const router = useRouter();

  const getMe = useRecoilValue(getMeAtom);

  useEffect(() => {
    if (!getMe) {
      router.replace('/login');
    }
  }, [getMe]);

  return (
    <div className='container'>
      <h1>dash</h1>
    </div>
  );
};

export default Dashboard;
