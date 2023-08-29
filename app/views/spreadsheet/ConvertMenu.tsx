import React, { useState } from 'react';
import AllConvertForm from './AllConvertForm';

type SetshowUploadButton = (value: boolean) => void;
type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;

interface ConvertMenuProps {
  openSpreadSheet: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setshowUploadButton: SetshowUploadButton;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
}

export default function ConvertMenu(props: ConvertMenuProps) {
  const [content, setContent] = useState('');

  return (
    <>
      <button
        className='inline-block text-md px-4 py-2 leading-none text-slate-400  hover:underline m-1'
        onClick={() => {
          props.openSpreadSheet();
          props.setshowUploadButton(true);
          props.setshowConvertMenu(false);
        }}
      >
        注文一覧に戻る
      </button>
      <div className='border border-slate-300 mr-10 ml-10 mt-2'>
        <p className='text-xl font-bold m-2'>内容品設定</p>
        <p className='text-md flex justify-center items-center'>
          クリックポストに表記する内容品を入力してください
        </p>
        <AllConvertForm
          content={props.content}
          setContent={props.setContent}
          setshowConvertMenu={props.setshowConvertMenu}
          setshowConvertSheet={props.setshowConvertSheet}
        />
      </div>
    </>
  );
}
