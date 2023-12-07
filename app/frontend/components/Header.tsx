import React, { useState } from 'react';
import '../declarations.d.ts';
import logo from '../images/logo_origin.png';
const Header = ({ current_user_email }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className='flex items-center pt-3 pr-3 pl-3 pb-1 border-b border-amber-600 print_none'>
      <div className='flex justify-center items-center w-full'>
        <div className='md:flex justify-between w-full max-w-1670'>
          <div className='flex justify-center mt-5 ml-8'>
            <a href='/'>
              <img src={logo} width='280' alt='ロゴ' />
            </a>
          </div>
          <div className='flex justify-end items-end overflow-hidden mr-[10px]'>
            <div
              id='menu'
              className='md:mt-10 mt-2 translate-y-[50px] transition-all'
            >
              <div className='flex flex-col md:flex-row'>
                <strong className='md:flex mt-0 mr-2 text-amber-600'>
                  {current_user_email.replace(/"/g, '')}
                </strong>
                <div className='flex'>
                  <a
                    href='/usage'
                    id='usage_button'
                    className='inline-block text-center md:w-[110px] w-[80px] text-sm px-4 py-2 leading-none border rounded text-white border-slate-800 bg-slate-800 hover:border-transparent hover:bg-amber-600 lg:mt-0 mr-2'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    使い方
                  </a>
                  <a
                    href='/users/edit'
                    id='setting_button'
                    className='inline-block text-center w-[110px] text-sm px-4 py-2 leading-none border rounded text-white border-slate-800 bg-slate-800 hover:border-transparent hover:bg-amber-600 lg:mt-0 mr-2'
                  >
                    ユーザー情報
                  </a>
                  <a
                    href='/users/sign_out'
                    id='signout_button'
                    className='inline-block text-center md:w-[110px] w-[100px] text-sm px-4 py-2 leading-none border rounded text-white border-slate-800 bg-slate-800 hover:border-transparent hover:bg-amber-600 lg:mt-0 mr-2'
                  >
                    サインアウト
                  </a>
                </div>
              </div>
            </div>
            <button
              id='openButton'
              type='button'
              className='z-10'
              onClick={() => {
                document
                  .getElementById('menu')
                  ?.classList.toggle('translate-y-[50px]');
                document
                  .getElementById('closeButton')
                  ?.classList.toggle('hidden');
                document
                  .getElementById('openButton')
                  ?.classList.toggle('hidden');
              }}
            >
              <i id='bars' className='fa-solid fa-bars fa-2x'></i>
            </button>
            <button
              id='closeButton'
              type='button'
              className='z-10 hidden'
              onClick={() => {
                document
                  .getElementById('menu')
                  ?.classList.toggle('translate-y-[50px]');

                document
                  .getElementById('closeButton')
                  ?.classList.toggle('hidden');
                document
                  .getElementById('openButton')
                  ?.classList.toggle('hidden');
              }}
            >
              <i
                id='xmark'
                className='fa-solid fa-xmark fa-2x w-[28px]'
                onClick={() => {
                  setOpenMenu(!openMenu);
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
