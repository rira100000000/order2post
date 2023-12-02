import React from 'react';
import '../declarations.d.ts';
import toPost from '../images/toPost.png';
import logo from '../images/logo_origin.png';
import Footer from './Footer.tsx';

function Top() {
  return (
    <>
      <div className='app'>
        <div className='content'>
          <div className='flex flex-col mt-5 items-center '>
            <a href='/'>
              <img src={logo} className='md:w-[560px] w-[300px]' alt='ロゴ' />
            </a>
          </div>

          <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center mt-10 md:w-[760px] w-[300px]'>
              <div className='flex justify-center items-center'>
                <p className='md:text-xl border-b-8 border-amber-600 mb-4'>
                  minne,Creemaの注文一覧データをクリックポストのまとめ申込用データへ変換します！
                </p>
              </div>
              <div className='flex flex-col mt-1 items-center '>
                <img
                  src={toPost}
                  width='480'
                  alt='注文がポストに入るイメージ'
                ></img>
              </div>
              <a
                href='/users/sign_up'
                id='signup_button'
                className='text-xl px-4 py-2 mt-4 mb-2 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600'
              >
                サインアップ
              </a>
              <div className='mt-5'>
                <a
                  href='/users/sign_in'
                  id='login_button'
                  className='inline-block text-sm px-4 py-2 leading-none text-amber-600 border-amber-600 lg:mt-0 hover:underline'
                >
                  登録済みの方はこちらからログインできます
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Top;
