import React, { useRef, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CSVReader from './CSVReader';
import ConvertMenu from './ConvertMenu';
import ConvertSheet from './ConvertSheet';
import { alertConverteds } from '../converteds';
import OrderSheet from './OrderSheet';
import type { ShippingInfo, Line } from '../types.d.ts';

type Props = {
  current_user_email?: string;
};

export default function SpreadSheet(props: Props) {
  const [showSpreadSheet, setshowSpreadSheet] = useState(false);
  const [showUploadButton, setshowUploadButton] = useState(true);
  const [showConvertMenu, setshowConvertMenu] = useState(false);
  const [showConvertSheet, setshowConvertSheet] = useState(false);
  const [service, setService] = useState('');
  const [content, setContent] = useState('');
  const [lines, setLines] = useState<Array<Line>>([]);
  const [shippingInfos, setShippingInfos] = useState([]);

  type setShippingInfos = React.Dispatch<React.SetStateAction<ShippingInfo[]>>;

  const openSpreadSheet = () => {
    setshowSpreadSheet(true);
  };
  const closeSpreadSheet = () => {
    setshowSpreadSheet(false);
  };

  const isEmpty = () => {
    return lines.length === 0;
  };

  const ischecked = () => {
    return lines.some((line) => {
      return line['checked'] === true;
    });
  };

  const checkdNum = () => {
    return lines.filter((line) => {
      return line['checked'] === true;
    }).length;
  };

  const handleOnClick = () => {
    if (ischecked()) {
      if (checkdNum() <= 40) {
        closeSpreadSheet();
        setshowUploadButton(false);
        setshowConvertMenu(true);
        alertConverteds(lines);
      } else {
        alert('一度に変換できる注文は40件までです。');
      }
    } else {
      alert('クリックポストに変換する注文にチェックを入れてください。');
    }
  };

  return (
    <>
      <div className='app'>
        <Header current_user_email={props.current_user_email} />
        <div className='content'>
          <div className='w-full flex justify-center'>
            {
              <div className='overflow-auto'>
                {showSpreadSheet && !isEmpty() && (
                  <div>
                    <OrderSheet lines={lines} setLines={setLines} />
                    <br />
                    <button
                      className='inline-block w-[150px] text-md px-4 py-2 leading-none border rounded text-amber-600 border-slate-800 bg-slate-800 hover:border-transparent text-white hover:bg-amber-600 m-3 print_none'
                      onClick={handleOnClick}
                    >
                      クリックポスト変換
                    </button>

                    <button
                      className='inline-block w-[150px] text-md px-4 py-2 leading-none border rounded text-amber-600 border-slate-800 bg-slate-800 hover:border-transparent text-white hover:bg-amber-600 m-3 print_none'
                      onClick={() => {
                        window.print();
                      }}
                    >
                      印刷する
                    </button>
                  </div>
                )}
                {showUploadButton && (
                  <CSVReader
                    openSpreadSheet={openSpreadSheet}
                    setLines={setLines}
                    service={service}
                    setService={setService}
                  />
                )}
              </div>
            }
            {showConvertSheet && (
              <ConvertSheet
                shippingInfos={shippingInfos}
                setshowConvertMenu={setshowConvertMenu}
                setshowConvertSheet={setshowConvertSheet}
              />
            )}
          </div>
          {showConvertMenu && (
            <ConvertMenu
              openSpreadSheet={openSpreadSheet}
              content={content}
              setContent={setContent}
              setshowUploadButton={setshowUploadButton}
              setshowConvertMenu={setshowConvertMenu}
              setshowConvertSheet={setshowConvertSheet}
              shippingInfos={shippingInfos}
              setShippingInfos={setShippingInfos as setShippingInfos}
              lines={lines}
              setLines={setLines}
            />
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
