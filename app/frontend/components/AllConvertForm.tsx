import React from 'react';
import { updateConverteds } from '../converteds';
import makeShippingInfos from '../makeShippingInfos';
import type { ShippingInfo, Line } from '../types.d.ts';

type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;

interface AllConvertFormProps {
  content: string;
  lines: Array<Line>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setShippingInfos: React.Dispatch<React.SetStateAction<ShippingInfo[]>>;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
}

export default function AllConvertForm(props: AllConvertFormProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setContent(event.target.value);
  };
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.content.length > 15) {
      alert('内容品は15文字以内で指定してください');
    } else if (!props.content) {
      alert('内容品を設定して下さい');
    } else {
      const shippingInfos = makeShippingInfos(props.content, props.lines);
      props.setShippingInfos(shippingInfos);
      updateConverteds(props.lines);
      props.setshowConvertMenu(false);
      props.setshowConvertSheet(true);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='flex justify-center items-center'>
        <label className='text-sm font-bold mt-3'>
          内容品 ※最大15文字
          <br />
          <input
            id='convertForm'
            type='text'
            name='content'
            placeholder='アクセサリー、衣類、おもちゃ'
            onChange={handleOnChange}
            value={props.content}
            className='inline-block text-md w-60 px-2 py-2 leading-none border rounded border-slate-300 m-0'
          />
        </label>
      </div>
      <div className='flex justify-center items-center'>
        <input
          type='submit'
          value='クリックポスト変換'
          className='inline-block text-md w-40 px-4 py-2 h-10 leading-none border rounded bg-slate-800 text-white border-slate-800 hover:border-transparent hover:bg-amber-600 hover:cursor-pointer m-3'
        />
      </div>
    </form>
  );
}
