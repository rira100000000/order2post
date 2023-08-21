import React, { useRef, useEffect, useState } from 'react';
import jspreadsheet from 'jspreadsheet-ce';
import '../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css';
import CSVReader from './CSVReader';
import ConvertMenu from './ConvertMenu';
import ConvertSheet from './ConvertSheet';

export default function SpreadSheet() {
  const [showSpreadSheet, setshowSpreadSheet] = useState(false);
  const [showUploadButton, setshowUploadButton] = useState(true);
  const [showConvertMenu, setshowConvertMenu] = useState(false);
  const [showConvertSheet, setshowConvertSheet] = useState(false);

  const [content, setContent] = React.useState('');

  const openSpreadSheet = () => {
    setshowSpreadSheet(true);
  };
  const closeSpreadSheet = () => {
    setshowSpreadSheet(false);
  };

  const calcShippingInfos = () => {
    type ShippingInfo = {
      addressInfo: string;
      content: string;
    };

    const shippingInfos: ShippingInfo[] = [];

    for (const line of lines) {
      let shippingInfo = { addressInfo: line[5], content: content };

      shippingInfos.push(shippingInfo);
    }
    return shippingInfos;
  };

  const options: any = {
    lines: [[]],
    minDimensions: [0, 0] as [number, number],
    wordWrap: true,
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
  const [lines, setLines] = useState<string[][]>([]);

  const isEmpty = () => {
    return lines.length === 0;
  };

  const myTable = useRef<ReturnType<typeof jspreadsheet> | null>(null);
  const jRef = useRef<HTMLDivElement | null>(null);

  const setRowStyles = () => {
    if (myTable.current) {
      const columns = myTable.current.getHeaders().length;

      for (let i = 0; i < lines.length; i++) {
        if (i % 2 === 0) {
          for (let j = 0; j < columns; j++) {
            let cellId = jspreadsheet.getColumnNameFromId([j, i]);
            myTable.current.setStyle(cellId, 'background-color', '#FDF5E6');
          }
        }
      }
    }
  };

  useEffect(() => {
    if (jRef.current && !myTable.current) {
      myTable.current = jspreadsheet(jRef.current, options);
      openSpreadSheet();
    } else {
      if (myTable.current) {
        myTable.current.setData(lines);
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
      {showUploadButton && <CSVReader setLines={setLines} />}
      {showConvertMenu && (
        <ConvertMenu
          openSpreadSheet={openSpreadSheet}
          setContent={setContent}
          setshowUploadButton={setshowUploadButton}
          setshowConvertMenu={setshowConvertMenu}
          setshowConvertSheet={setshowConvertSheet}
        />
      )}
      {showConvertSheet && (
        <ConvertSheet content={content} shippingInfos={calcShippingInfos()} />
      )}
    </div>
  );
}
