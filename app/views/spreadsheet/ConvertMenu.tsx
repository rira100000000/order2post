import React, { useState, useEffect } from 'react';
import AllConvertForm from './AllConvertForm';
import IndividualConvertForm from './ IndividualConvertForm';
import axios from 'axios';

type SetshowUploadButton = (value: boolean) => void;
type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;
type shippingInfo = {
  addressInfo: string; //注文一覧の住所欄の情報
  content: string; // 内容品
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
  lines: string[][];
}

interface Conversions {
  item: string;
  content: string;
}

export default function ConvertMenu(props: ConvertMenuProps) {
  const [content, setContent] = useState('');
  const [conversions, setConversions] = useState<Conversions>({
    item: '',
    content: ''
  });

  const calcShippingInfos = () => {
    type ShippingInfo = {
      addressInfo: string; //注文一覧の住所欄の情報
      content: string; // 内容品
    };

    const shippingInfos: ShippingInfo[] = [];

    for (const line of props.lines) {
      let shippingInfo = { addressInfo: line[5], content: content };

      shippingInfos.push(shippingInfo);
    }
    return shippingInfos;
  };

  useEffect(() => {
    axios
      .get('/conversions')
      .then((response) => {
        setConversions(response.data);
        console.log(response.data);
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
          setShippingInfos={props.setShippingInfos}
          lines={props.lines}
        />
      </div>
      <div className='border border-slate-300 mr-10 ml-10 mt-2'>
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
