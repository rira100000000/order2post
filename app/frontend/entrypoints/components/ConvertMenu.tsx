import React, { useState, useEffect } from 'react';
import AllConvertForm from './AllConvertForm';
import IndividualConvertForm from './IndividualConvertForm';
import axios from 'axios';

type SetshowUploadButton = (value: boolean) => void;
type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;
type setLines = (value: string[][]) => void;
type shippingInfo = {
  addressInfo: string;
  item: string;
  content: string;
};
type setShippingInfos = React.Dispatch<React.SetStateAction<shippingInfo[]>>;

interface ConvertMenuProps {
  openSpreadSheet: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setshowUploadButton: SetshowUploadButton;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
  shippingInfos: shippingInfo[];
  setShippingInfos: setShippingInfos;
  lines: Array<Array<string | boolean>>;
  setLines: setLines;
}

type Conversions = {
  [key: string]: string;
};

export default function ConvertMenu(props: ConvertMenuProps) {
  const [conversions, setConversions] = useState<Conversions>({});

  useEffect(() => {
    axios
      .get('/conversions')
      .then((response) => {
        setConversions(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました: ', error);
      });
  }, []);

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
      <div className='border border-slate-300 mx-auto mt-2 w-[50em]'>
        <p className='text-xl font-bold m-2'>内容品設定</p>
        <p className='text-md flex justify-center items-center'>
          クリックポストに表記する内容品を入力してください
        </p>
        <AllConvertForm
          content={props.content}
          setContent={props.setContent}
          setshowConvertMenu={props.setshowConvertMenu}
          setshowConvertSheet={props.setshowConvertSheet}
          setShippingInfos={props.setShippingInfos}
          lines={props.lines}
        />
      </div>
      <div className='border border-slate-300 mx-auto mt-2 w-[50em]'>
        <p className='text-xl font-bold m-2'>内容品個別設定</p>
        <p className='text-md flex justify-center items-center'>
          クリックポストに表記する内容品を入力してください
        </p>
        <IndividualConvertForm
          lines={props.lines}
          conversions={conversions}
          setShippingInfos={props.setShippingInfos}
          setshowConvertMenu={props.setshowConvertMenu}
          setshowConvertSheet={props.setshowConvertSheet}
        />
      </div>
    </>
  );
}