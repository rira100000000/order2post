import React, { useRef, useEffect, useState } from 'react';
import jspreadsheet from 'jspreadsheet-ce';
import '../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css';
import '../../assets/stylesheets/spreadsheet.css';
import CSVReader from './CSVReader';
import ConvertMenu from './ConvertMenu';
import ConvertSheet from './ConvertSheet';

export default function SpreadSheet() {
  const [showSpreadSheet, setshowSpreadSheet] = useState(false);
  const [showUploadButton, setshowUploadButton] = useState(true);
  const [showConvertMenu, setshowConvertMenu] = useState(false);
  const [showConvertSheet, setshowConvertSheet] = useState(false);
  const [service, setService] = useState('');
  const [content, setContent] = useState('');
  const [lines, setLines] = useState<string[][]>([]);
  const [shippingInfos, setShippingInfos] = useState([]);

  type shippingInfo = {
    addressInfo: string; //注文一覧の住所欄の情報
    item: string; //商品
    content: string; //内容品
  };
  type setShippingInfos = React.Dispatch<React.SetStateAction<shippingInfo[]>>;

  const openSpreadSheet = () => {
    setshowSpreadSheet(true);
  };
  const closeSpreadSheet = () => {
    setshowSpreadSheet(false);
  };

  const options: any = {
    lines: [[]],
    minDimensions: [0, 0] as [number, number],
    wordWrap: true,
    allowInsertRow: false,
    columns: [
      { title: '変換対象選択', type: 'checkbox', width: 100 },
      { title: '注文番号', width: 100 },
      { title: '発送方法', width: 120 },
      { title: '商品名', width: 250 },
      { title: '数量', width: 50 },
      { title: '発送先', width: 300 },
      { title: '注文日', width: 100 },
      { title: '備考', width: 300 }
    ]
  };

  const isEmpty = () => {
    return lines.length === 0;
  };

  const table = useRef<ReturnType<typeof jspreadsheet> | null>(null);
  const jRef = useRef<HTMLDivElement | null>(null);

  const setRowStyles = () => {
    const rowsWithDateY = document.querySelectorAll('td');

    console.log(rowsWithDateY.length);
    // 取得した要素をループで処理
    let isEvenRow = false;

    rowsWithDateY.forEach((row, index) => {
      if (index % 9 === 0) {
        isEvenRow = !isEvenRow;
      }

      if (isEvenRow) {
        row.classList.add('even-row');
      }
      if (!(index % 9 === 1)) {
        row.classList.add('readonly');
      }
    });
  };

  useEffect(() => {
    if (jRef.current && !table.current) {
      table.current = jspreadsheet(jRef.current, options);
      openSpreadSheet();
    } else {
      if (table.current) {
        table.current.setData(lines);
        setRowStyles();
      }
    }
  }, [options, lines]);

  return (
    <div>
      {!showSpreadSheet || isEmpty() ? (
        <div ref={jRef} style={{ display: 'none' }} />
      ) : (
        <div ref={jRef} />
      )}
      <br />
      {showSpreadSheet && !isEmpty() && (
        <button
          className='inline-block text-md px-4 py-2 h-20 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
          onClick={() => {
            closeSpreadSheet();
            setshowUploadButton(false);
            setshowConvertMenu(true);
          }}
        >
          クリックポスト変換
        </button>
      )}
      {showUploadButton && (
        <CSVReader
          setLines={setLines}
          service={service}
          setService={setService}
        />
      )}
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
        />
      )}
      {showConvertSheet && (
        <ConvertSheet
          shippingInfos={shippingInfos}
          setshowConvertMenu={setshowConvertMenu}
          setshowConvertSheet={setshowConvertSheet}
        />
      )}
    </div>
  );
}
