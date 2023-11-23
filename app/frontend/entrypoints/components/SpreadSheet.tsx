import React, { useRef, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import jspreadsheet from 'jspreadsheet-ce';
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

  const options: any = {
    lines: [[]],
    minDimensions: [0, 0] as [number, number],
    wordWrap: true,
    allowInsertRow: false,
    columns: [
      { title: '変換対象選択', type: 'checkbox' },
      { title: '注文番号' },
      { title: '発送方法' },
      { title: '商品名' },
      { title: '数量' },
      { title: '発送先' },
      { title: '注文日' },
      { title: '備考' }
    ]
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

  const table = useRef<ReturnType<typeof jspreadsheet> | null>(null);
  const jRef = useRef<HTMLDivElement | null>(null);

  const setRowStyles = () => {
    const spreadsheetDivs = document.querySelectorAll('.spreadsheet');
    for (const spreadsheetDiv of spreadsheetDivs) {
      const spreadsheet = spreadsheetDiv.querySelector('.jexcel_content');

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
            const computedStyle = window.getComputedStyle(row);
            if (computedStyle.display !== 'none') {
              if (index % 2 === 0) {
                // 偶数行に色を付けるため
                cell.classList.add('even-row');
              } else {
                // 偶数行に色を付けるため
                cell.classList.add('odd-row');
              }
            }
          });
        });
      }
    }
  };

  const setColStyle = () => {
    const spreadsheets = document.querySelectorAll('.resizable');
    for (const spreadsheet of spreadsheets) {
      const cells = spreadsheet.querySelectorAll('td');
      cells[0].classList.add('hide');
      cells[1].classList.add('w-[120px]');
      cells[2].classList.add('w-[120px]');
      cells[3].classList.add('w-[120px]');
      cells[4].classList.add('w-[300px]');
      cells[5].classList.add('w-[10px]');
      cells[6].classList.add('w-[300px]');
      cells[7].classList.add('w-[100px]');
      cells[8].classList.add('w-[300px]');
    }
  };

  const setCheckboxStyles = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let counter = 1;
    for (const checkbox of checkboxes) {
      checkbox.id = `checkbox-${counter}`;
      const targetCheckbox = document.getElementById(`checkbox-${counter}`);
      if (targetCheckbox) {
        targetCheckbox.addEventListener('click', () => {
          targetCheckbox.click();
        });
      }
      counter++;
    }

    const checkboxCells = document.querySelectorAll('.checkbox-cell');
    checkboxCells.forEach((cell, index) => {
      cell.id = `checkboxCell-${index}`;
      cell.addEventListener('click', () => {
        const checkbox = document.getElementById(`checkbox-${index}`);
        if (checkbox) {
          checkbox.click();
        }
      });
    });
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

  useEffect(() => {
    if (jRef.current && !table.current) {
      table.current = jspreadsheet(jRef.current, options);
      openSpreadSheet();
    } else if (table.current) {
      table.current.setData(lines);
      setRowStyles();
      setColStyle();
      setCheckboxStyles();
    }
  }, [options, lines]);
  return (
    <>
      <div className='app'>
        <div className='content'>
          <Header current_user_email={props.current_user_email} />

          <div className='md:w-full'>
            {!showSpreadSheet || isEmpty() ? (
              <div ref={jRef} style={{ display: 'none' }} />
            ) : (
              <div ref={jRef} className='spreadsheet print_none w-max' />
            )}
            <br />
            {showSpreadSheet && !isEmpty() && (
              <div className='print_none'>
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
