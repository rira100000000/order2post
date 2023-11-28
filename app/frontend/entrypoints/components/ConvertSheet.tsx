import React, { useRef, useEffect } from 'react';
import outputToConvertSheet from '../clickpost';
import * as Encoding from 'encoding-japanese';
import saveAs from 'file-saver';

interface ConvertSheetProps {
  shippingInfos: shippingInfo[];
  setshowConvertMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setshowConvertSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

interface shippingInfos {
  shippingInfos: shippingInfo[];
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

  const output = useRef<string[][]>([]);

  useEffect(() => {
    output.current = outputToConvertSheet(props.shippingInfos);
    console.log(output.current);
  }, [props.shippingInfos]);

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
        <div className='content'>
          <Sheet shippingInfos={props.shippingInfos} />
        </div>
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

const Sheet = (props: shippingInfos) => {
  const classes = (index: number, oddOrEven: string): string => {
    switch (index % 7) {
      case 0:
        return `readonly min-130 ${oddOrEven}`;
      case 1:
        return `readonly min-120 ${oddOrEven}`;
      case 2:
        return `readonly min-120 ${oddOrEven}`;
      case 3:
        return `readonly min-250 ${oddOrEven}`;
      case 4:
        return `readonly min-250 ${oddOrEven}`;
      case 5:
        return `readonly min-250 ${oddOrEven}`;
      case 6:
        return `readonly min-250 ${oddOrEven}`;
      case 7:
        return `readonly min-300 ${oddOrEven}`;
      default:
        return 'unknown';
    }
  };

  const outputRows = outputToConvertSheet(props.shippingInfos).map(
    (line, index) => {
      let oddOrEven = '';
      if (index % 2 === 0) {
        oddOrEven = 'even-row';
      } else {
        oddOrEven = 'odd-row';
      }

      return (
        <tr key={index}>
          {line.map((item, dataIndex) => (
            <td key={dataIndex} className={classes(dataIndex, oddOrEven)}>
              {item}
            </td>
          ))}
        </tr>
      );
    }
  );

  return (
    <table className='converted_sheet'>
      <tbody>{outputRows}</tbody>
    </table>
  );
};
