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

    const unicodeList: number[] = csvString
      .split('')
      .map((char) => char.charCodeAt(0));

    const shiftJisCodeList = Encoding.convert(unicodeList, {
      to: 'SJIS',
      from: 'UNICODE'
    });
    const uInt8List = new Uint8Array(shiftJisCodeList);

    const writeData = new Blob([uInt8List], { type: 'text/csv' });
    saveAs(writeData, 'clickpost.csv');
  };

  const setRowStyles = () => {
    const convertsheetDiv = document.querySelector('.convert-sheet');
    const spreadsheet = convertsheetDiv?.querySelector('.jexcel_content');
    if (spreadsheet) {
      const rows = spreadsheet.querySelectorAll('tr');
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, cellIndex) => {
          if (!(cellIndex % 9 === 1)) {
            // checkbox以外編集不可にするため
            cell.classList.add('readonly');
          } else {
            // checkboxのセル全体をクリック可能にするため
            cell.classList.add('checkbox-cell');
          }
          if ((index + 1) % 2 === 0) {
            // 偶数行に色を付けるため
            cell.classList.add('even-row');
          } else {
            // 奇数行に色を付けるため
            cell.classList.add('odd-row');
          }
        });
      });
    }
  };

  const setColStyle = () => {
    const spreadsheets = document.querySelectorAll('.convert-sheet');
    for (const spreadsheet of spreadsheets) {
      const draggable = spreadsheet.querySelectorAll('.draggable');
      const cells = draggable[0].querySelectorAll('td');
      cells[0].classList.add('hide');
      cells[1].classList.add('min-130');
      cells[2].classList.add('min-120');
      cells[3].classList.add('min-120');
      cells[4].classList.add('min-250');
      cells[5].classList.add('min-250');
      cells[6].classList.add('min-250');
      cells[7].classList.add('min-250');
      cells[8].classList.add('min-300');
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
    if (!convertTable.current && convertRef.current) {
      convertTable.current = jspreadsheet(convertRef.current, options);
    }
    output.current = outputToConvertSheet(props.shippingInfos);
    convertTable.current?.setData(output.current);
    setColStyle();
    setRowStyles();
  }, [options, props.shippingInfos, convertRef.current]);

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
        <div ref={convertRef} className='convert-sheet w-max' />
        <div>
          <button
            className='inline-block text-md px-4 py-2 h-10 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 hover:cursor-pointer m-3'
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
