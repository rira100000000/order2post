import React, { useRef, useEffect } from 'react';
import jspreadsheet from 'jspreadsheet-ce';
import outputToConvertSheet from '../clickpost';
import * as Encoding from 'encoding-japanese';
import saveAs from 'file-saver';

interface ConvertSheetProps {
  shippingInfos: shippingInfo[];
  setshowConvertMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setshowConvertSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

interface shippingInfo {
  addressInfo: string;
  item: string;
  content: string;
}

export default function ConvertSheet(props: ConvertSheetProps) {
  const saveCSV = (csvData: string[][]) => {
    let csvString = '';
    for (const line of csvData) {
      csvString = csvString + line + '\n';
    }

    const unicodeList: number[] = [];
    for (let i = 0; i < csvString.length; i++) {
      unicodeList.push(csvString.charCodeAt(i));
    }

    const shiftJisCodeList = Encoding.convert(unicodeList, {
      to: 'SJIS',
      from: 'UNICODE'
    });
    const uInt8List = new Uint8Array(shiftJisCodeList);

    const writeData = new Blob([uInt8List], { type: 'text/csv' });
    console.log(writeData);
    saveAs(writeData, 'clickpost.csv');
  };

  const setColStyle = () => {
    const spreadsheets = document.querySelectorAll('.convert-sheet');
    console.log(spreadsheets);
    for (const spreadsheet of spreadsheets) {
      const draggable = spreadsheet.querySelectorAll('.draggable');
      console.log(draggable);
      const cells = draggable[0].querySelectorAll('td');
      console.log(cells[2]);
      cells[0].classList.add('hide');
      cells[1].classList.add('w-[130px]');
      cells[2].classList.add('w-[120px]');
      cells[3].classList.add('w-[120px]');
      cells[4].classList.add('w-[250px]');
      cells[5].classList.add('w-[250px]');
      cells[6].classList.add('w-[250px]');
      cells[7].classList.add('w-[250px]');
      cells[8].classList.add('w-[300px]');
    }
  };

  const options: any = {
    data: [[]],
    minDimensions: [0, 0] as [number, number],
    columns: [
      { title: 'お届け先郵便番号' },
      { title: 'お届け先氏名' },
      { title: 'お届け先敬称' },
      { title: 'お届け先住所1行目' },
      { title: 'お届け先住所2行目' },
      { title: 'お届け先住所3行目' },
      { title: 'お届け先住所4行目' },
      { title: '内容品' }
    ]
  };

  const convertTable = useRef<ReturnType<typeof jspreadsheet> | null>(null);
  const convertRef = useRef<HTMLDivElement | null>(null);
  const output = useRef<string[][]>([]);

  useEffect(() => {
    if (convertRef.current && !convertTable.current) {
      convertTable.current = jspreadsheet(convertRef.current, options);
    } else {
      if (convertTable.current) {
        output.current = outputToConvertSheet(props.shippingInfos);
        convertTable.current.setData(output.current);
        setColStyle();
      }
    }
  }, [options, props.shippingInfos]);

  return (
    <>
      <button
        className='inline-block text-md px-4 py-2 leading-none text-slate-400  hover:underline m-1'
        onClick={() => {
          props.setshowConvertMenu(true);
          props.setshowConvertSheet(false);
        }}
      >
        内容品設定に戻る
      </button>
      <div>
        <div ref={convertRef} className='convert-sheet ml-4' />
        <div>
          <button
            className='inline-block text-md px-4 py-2 h-10 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 hover:cursor-pointer m-3'
            onClick={() => {
              saveCSV(output.current);
            }}
          >
            ダウンロード
          </button>
        </div>
      </div>
    </>
  );
}
