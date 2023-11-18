import React from 'react';
import '../declarations.d.ts';
import minneToPost from '../images/minneToPost.png';
import logo from '../images/logo_origin.png';

function Top() {
  return (
    <>
      <div className='flex flex-col mt-5 items-center '>
        <a href='/'>
          <img src={logo} width='560' alt='img' />
        </a>
      </div>

      <div className='flex flex-col items-center'>
        <div className='mt-10 w-[760px] '>
          <div className='flex flex-col items-center'>
            <div className='flex justify-center items-center w-full'>
              <div className='flex flex-col items-center black'>
                <p className='md:text-xl border-b-8 border-amber-600 mb-4'>
                  minne,Creemaの注文一覧データをクリックポストのまとめ申込用データへ変換します！
                </p>
              </div>
            </div>
            <div className='flex flex-col mt-1 items-center '>
              <img src={minneToPost} width='480' alt='image'></img>
            </div>
            <a
              href='/users/sign_up'
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
    </>
  );
}

export default Top;
