import React from 'react';

const Footer = () => {
  return (
    <footer className='print_none'>
      <nav className='flex items-center justify-center flex-wrap p-3 bg-slate-800'>
        <div className='flex flex-shrink-0 text-white mr-6'>
          <a href='/privacy'>プライバシーポリシー</a>
        </div>
        <div className='flex flex-shrink-0 text-white mr-6'>
          <a href='/terms'>利用規約</a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
