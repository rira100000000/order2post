import React from 'react';

const Footer = () => {
  return (
    <footer className='print_none'>
      <nav className='block p-3 bg-slate-800'>
        <div className='flex justify-center flex-wrap bg-slate-800'>
          <div className='flex text-white mr-6'>
            <a href='/privacy' className='hover:underline'>
              プライバシーポリシー
            </a>
          </div>
          <div className='flex text-white'>
            <a href='/terms' className='hover:underline'>
              利用規約
            </a>
          </div>
        </div>
        <div className='flex justify-center text-white mt-2'>
          <p>©2023 rira100000000</p>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
