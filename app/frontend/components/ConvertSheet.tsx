import React, { useRef, useEffect } from 'react';
import outputToConvertSheet from '../clickpost';
import useSaveCSV from '../hooks/useSaveCSV';
import type { ShippingInfo } from '../types.d.ts';

interface ConvertSheetProps {
  shippingInfos: ShippingInfo[];
  setshowConvertMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setshowConvertSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ShippingInfos {
  shippingInfos: ShippingInfo[];
}

export default function ConvertSheet(props: ConvertSheetProps) {
  const output = useRef<string[][]>([]);

  useEffect(() => {
    output.current = outputToConvertSheet(props.shippingInfos);
  }, [props.shippingInfos]);

  const saveCSV = useSaveCSV();
  return (
    <div className='w-full flex justify-center '>
      <div className='w-full max-w-1670'>
        <div className='flex flex-col'>
          <div className='max-w-1670'>
            <button
              className='inline-block text-md py-2 leading-none text-slate-400 underline hover:no-underline m-2'
              onClick={() => {
                props.setshowConvertMenu(true);
                props.setshowConvertSheet(false);
              }}
            >
              内容品設定に戻る
            </button>
            <div className='overflow-auto max-w-1670 m-2'>
              <Sheet shippingInfos={props.shippingInfos} />
            </div>
            <div>
              <button
                className='inline-block text-md px-4 py-2 h-10 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 hover:cursor-pointer m-2'
                onClick={() => {
                  saveCSV(output.current);
                }}
              >
                ダウンロード
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Sheet = (props: ShippingInfos) => {
  const classes = (index: number, oddOrEven: string): string => {
    switch (index) {
      case 0:
        return `min-130 ${oddOrEven}`;
      case 1:
      case 2:
        return `min-120 ${oddOrEven}`;
      case 3:
      case 4:
      case 5:
      case 6:
        return `min-250 ${oddOrEven}`;
      case 7:
        return `min-250 ${oddOrEven}`;
      default:
        return 'unknown';
    }
  };

  const keyName = (index: number): string => {
    switch (index) {
      case 0:
        return 'postalcode';
      case 1:
        return 'name';
      case 2:
        return 'compellation ';
      case 3:
        return 'address1';
      case 4:
        return 'address2';
      case 5:
        return 'address3';
      case 6:
        return 'address4';
      case 7:
        return 'content';
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
        <tr key={line[0]}>
          {line.map((item, dataIndex) => (
            <td
              key={line[0] + keyName(dataIndex)}
              className={classes(dataIndex, oddOrEven)}
            >
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
