import React, { Fragment } from 'react';

const Navbar = () => {
  return (
    <Fragment>
      <nav className='blue darken-4'>
        <div className='nav-wrapper'>
          <div className='container'>
            <a href='/' className='brand-logo'>
              FElixir
            </a>
            <ul className='right'>
              <li>
                <a href='/login'>Login</a>
              </li>
              <li>
                <a href='/register'>Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
