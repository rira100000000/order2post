import React, { useState } from 'react';
import '../declarations.d.ts';
import logo from '../images/logo_origin.png';
const Header = ({ current_user_email }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className='flex items-center p-3 border-b border-t-0 border-l-0 border-r-0 border-amber-600 print_none'>
      <div className='flex justify-center items-center w-full'>
        <div className='md:flex max-w-1325 w-full justify-between'>
          <div className='flex flex-shrink-0 text-amber-600'>
            <a href='/'>
              <img src={logo} width='280' alt='ロゴ' />
            </a>
          </div>
          <div className='flex justify-end'>
            <div className='text-sm'>
              <strong className='flex justify-end mr-2 md:mt-5 text-amber-600'>
                {current_user_email.replace(/"/g, '')}
              </strong>
            </div>
            <button
              id='openButton'
              type='button'
              className='z-10'
              onClick={() => {
                document
                  .getElementById('menu')
                  ?.classList.toggle('translate-x-full');
                setOpenMenu(!openMenu);
              }}
            >
              <i
                id='bars'
                className={`fa-solid ${
                  openMenu ? 'fa-bars' : 'fa-xmark'
                } fa-2x`}
              ></i>
            </button>
            <ul
              id='menu'
              className='fixed top-0 left-0 z-0 w-full translate-x-full bg-amber-600 text-center text-xl font-bold text-white transition-all ease-linear'
            >
              <li className='p-3'>
                <a
                  href='/usage'
                  id='usage_button'
                  className='inline-block text-xl px-4 py-2 leading-none border rounded text-white border-amber-600 hover:border-transparent hover:text-white hover:underline lg:mt-0 mr-2'
                >
                  使い方
                </a>
              </li>
              <li className='p-3'>
                <a
                  href='/users/edit'
                  id='setting_button'
                  className='inline-block text-xl px-4 py-2 leading-none border rounded text-white border-amber-600 hover:border-transparent hover:text-white hover:underline lg:mt-0 mr-2'
                >
                  設定
                </a>
              </li>
              <li className='p-3'>
                <a
                  href='/users/sign_out'
                  id='signout_button'
                  className='inline-block text-xl px-4 py-2 leading-none border rounded text-white border-amber-600 hover:border-transparent hover:text-white hover:underline lg:mt-0 mr-2'
                >
                  サインアウト
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
