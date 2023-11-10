import React from 'react';
import '../declarations.d.ts';
import minneToPost from '../minneToPost.png';

function Top() {
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='mt-10  w-[760px] border rounded border-amber-500'>
          <div className='flex justify-center items-center w-full'>
            <div className='flex flex-col items-center text-yellow-800'>
              <p className='md:text-xl border-b-8 border-red-500 mt-10 mb-4'>
                minne,Creemaの注文一覧データをクリックポストのまとめ申込用データへ変換します！
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='flex flex-col mt-1 items-center text-yellow-800'>
              <img src={minneToPost} width='700' alt='image'></img>
            </div>
            <a
              href='/users/sign_up'
              className='text-xl px-4 py-2 mb-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500'
            >
              サインアップ
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Top;
