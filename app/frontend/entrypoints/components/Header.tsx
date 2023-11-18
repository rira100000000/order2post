import React from 'react';
import '../declarations.d.ts';
import logo from '../images/logo_origin.png';
const Header = ({ current_user_email }) => {
  return (
    <>
      <nav className='flex items-center justify-between flex-wrap p-3 border-b border-t-0 border-l-0 border-r-0 border-amber-600 print_none'>
        <div className='flex flex-shrink-0 text-amber-600 mr-6'>
          <a href='/'>
            <img src={logo} width='280' alt='img' />
          </a>
        </div>
        <div className='block flex-grow flex justify-end items-center mr-4'>
          <div className='text-sm lg:flex-grow'>
            <strong className='flex justify-end mt-0 mr-2 text-amber-600'>
              {current_user_email.replace(/"/g, '')}
            </strong>
          </div>
          <div className='mr-5'>
            <a
              href='/usage'
              id='usage_button'
              className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 lg:mt-0 mr-2'
            >
              使い方
            </a>
            <a
              href='/users/edit'
              id='setting_button'
              className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 lg:mt-0 mr-2'
            >
              設定
            </a>
            <a
              href='/users/sign_out'
              id='signout_button'
              className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 lg:mt-0 mr-2'
            >
              サインアウト
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
