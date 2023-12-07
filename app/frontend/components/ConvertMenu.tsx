import React, { useState, useEffect } from 'react';
import AllConvertForm from './AllConvertForm';
import IndividualConvertForm from './IndividualConvertForm';
import axios from 'axios';
import label from '../images/label.png';
import type { ShippingInfo, Line } from '../types.d.ts';

type SetshowUploadButton = (value: boolean) => void;
type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;
type setLines = (value: string[][]) => void;
type setShippingInfos = React.Dispatch<React.SetStateAction<ShippingInfo[]>>;

interface ConvertMenuProps {
  openSpreadSheet: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setshowUploadButton: SetshowUploadButton;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
  shippingInfos: ShippingInfo[];
  setShippingInfos: setShippingInfos;
  lines: Array<Line>;
  setLines: React.Dispatch<React.SetStateAction<Array<Line>>>;
}

type Conversions = {
  [key: string]: string;
};

export default function ConvertMenu(props: ConvertMenuProps) {
  const [conversions, setConversions] = useState<Conversions>({});
  const [allConvertMenu, setAllConvertMenu] = useState(false);
  const [individualConvertMenu, setIndividualConvertMenu] = useState(false);

  useEffect(() => {
    axios
      .get('/conversions')
      .then((response) => {
        setConversions(response.data);
      })
      .catch((error) => {
        console.error('データの取得に失敗しました: ', error);
      });
  }, [allConvertMenu, individualConvertMenu]);

  const detailsOnClick = (clickTarget, setClickTarget, setAnotherTaget) => {
    setClickTarget(!clickTarget);
    setAnotherTaget(false);
  };

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col max-w-760'>
        <div className='flex justify-center w-full max-w-760'>
          <div className='flex justify-start max-w-760 w-full'>
            <button
              className='left-0 top-0 text-md px-4 py-2 leading-none text-slate-500 hover:no-underline underline m-1'
              onClick={() => {
                props.openSpreadSheet();
                props.setshowUploadButton(true);
                props.setshowConvertMenu(false);
              }}
            >
              注文一覧に戻る
            </button>
          </div>
        </div>
        <h1 className='text-center top-0 text-xl font-bold m-3 mt-0'>
          クリックポスト変換設定
        </h1>

        <div className='border border-amber-600 mx-auto mt-2 md:w-[50em] w-[90%] bg-white'>
          <details open={allConvertMenu}>
            <summary
              id='allConvertMenu'
              className='text-xl font-bold m-2 hover:cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                detailsOnClick(
                  allConvertMenu,
                  setAllConvertMenu,
                  setIndividualConvertMenu
                );
              }}
            >
              内容品を一括で設定する
            </summary>
            <p className='text-md flex justify-center items-center'>
              クリックポストのラベルに表記する、
              <br className='md:hidden' />
              内容品を入力してください
            </p>
            <AllConvertForm
              content={props.content}
              setContent={props.setContent}
              setshowConvertMenu={props.setshowConvertMenu}
              setshowConvertSheet={props.setshowConvertSheet}
              setShippingInfos={props.setShippingInfos}
              lines={props.lines}
            />
          </details>
        </div>
        <div className='border border-amber-600 mx-auto mt-2 md:w-[50em] w-[90%] bg-white'>
          <details open={individualConvertMenu}>
            <summary
              id='individualConvertMenu'
              className='text-xl font-bold m-2 hover:cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                detailsOnClick(
                  individualConvertMenu,
                  setIndividualConvertMenu,
                  setAllConvertMenu
                );
              }}
            >
              内容品を個別に設定する
            </summary>
            <p className='text-md flex justify-center items-center'>
              クリックポストのラベルに表記する、
              <br className='md:hidden' />
              内容品を入力してください
            </p>
            <IndividualConvertForm
              lines={props.lines}
              conversions={conversions}
              setShippingInfos={props.setShippingInfos}
              setshowConvertMenu={props.setshowConvertMenu}
              setshowConvertSheet={props.setshowConvertSheet}
            />
          </details>
        </div>
        <div className='m-3 flex justify-center items-center'>
          <div>
            <p>
              全ての商品で同じ内容品を記入する場合は、
              <br />
              『内容品を一括で設定する』フォームに記入してください。
            </p>
            <br />{' '}
            <p>
              商品毎に内容品を変更したい場合は、
              <br />
              『内容品を個別に設定する』フォームに記入してください。
            </p>
          </div>
          <img src={label} width='180' alt='ロゴ' />
        </div>
      </div>
    </div>
  );
}
