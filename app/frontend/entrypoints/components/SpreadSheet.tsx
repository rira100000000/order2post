import React, { useRef, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CSVReader from './CSVReader';
import ConvertMenu from './ConvertMenu';
import ConvertSheet from './ConvertSheet';
import { alertConverteds } from '../converteds';
import PrintSheet from './PrintSheet';

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
  const [lines, setLines] = useState<Array<Array<string | boolean>>>([]);
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

  const isEmpty = () => {
    return lines.length === 0;
  };

  const ischecked = () => {
    return lines.some((line) => {
      return line[0] === true;
    });
  };

  const checkdNum = () => {
    return lines.filter((line) => {
      return line[0] === true;
    }).length;
  };

  const handleClick = () => {
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
        <div className='content'>
          <Header current_user_email={props.current_user_email} />

          <div className='w-full'>
            {showSpreadSheet && !isEmpty() && (
              <div className='print_none'>
                <OrderSheet lines={lines} setLines={setLines} />
                <br />
                <button
                  className='inline-block text-md px-4 py-2 h-20 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 m-3'
                  onClick={handleClick}
                >
                  クリックポスト変換
                </button>

                <button
                  className='inline-block text-md px-4 py-2 h-20 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 m-3 print_none'
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
            {showConvertSheet && (
              <ConvertSheet
                shippingInfos={shippingInfos}
                setshowConvertMenu={setshowConvertMenu}
                setshowConvertSheet={setshowConvertSheet}
              />
            )}
            {<PrintSheet lines={lines} />}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

interface OrderSheetProps {
  lines: Array<Array<string | boolean>>;
  setLines: React.Dispatch<
    React.SetStateAction<Array<Array<string | boolean>>>
  >;
}

function OrderSheet(props: OrderSheetProps) {
  const addBr = (msg: string) => {
    const texts = msg.split(/(\n)/).map((item, index) => {
      return (
        <React.Fragment key={index}>
          {item.match(/\n/) ? <br /> : item}
        </React.Fragment>
      );
    });
    return texts;
  };

  const classes = (index: number, oddOrEven: string): string => {
    switch (index % 7) {
      case 0:
        return `min-120 ${oddOrEven}`;
      case 1:
        return `min-120 ${oddOrEven}`;
      case 2:
        return `min-300 ${oddOrEven}`;
      case 3:
        return `min-10 ${oddOrEven}`;
      case 4:
        return `min-300 ${oddOrEven}`;
      case 5:
        return `min-100 ${oddOrEven}`;
      case 6:
        return `min-300 ${oddOrEven}`;
      default:
        return 'unknown';
    }
  };

  const outputToOrderSheet = () => {
    const handleOnChange = (index) => {
      const copyLines = [...props.lines];
      copyLines[index][0] = !copyLines[index][0];
      props.setLines(copyLines);
    };

    const handleOnClick = (index) => {
      const checkbox = document.getElementById(`checkbox-${index}`);
      if (checkbox) {
        checkbox.click();
      }
    };

    const outputRows = props.lines.map((line, index) => {
      let oddOrEven = '';
      if (index % 2 === 0) {
        oddOrEven = 'even-row';
      } else {
        oddOrEven = 'odd-row';
      }
      return (
        <tr key={index}>
          <td
            className={`min-120 ${oddOrEven} checkbox-cell`}
            onClick={() => {
              handleOnClick(index);
            }}
          >
            <div className='flex justify-center items-center'>
              <input
                type='checkbox'
                id={`checkbox-${index}`}
                className='self-start'
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={() => handleOnChange(index)}
                checked={line[0] ? true : false}
              />
            </div>
          </td>
          {line.slice(1).map((item, dataIndex) => (
            <td key={dataIndex} className={classes(dataIndex, oddOrEven)}>
              {addBr(item as string)}
            </td>
          ))}
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>変換対象選択</th>
            <th>注文番号</th>
            <th>発送方法</th>
            <th>商品名</th>
            <th>数量</th>
            <th>発送先</th>
            <th>注文日</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>{outputRows}</tbody>
      </table>
    );
  };

  return <>{outputToOrderSheet()}</>;
}
