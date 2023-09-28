import React, { useRef, useEffect, useState } from 'react';
import jspreadsheet from 'jspreadsheet-ce';
import '../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css';
import '../../assets/stylesheets/spreadsheet.css';
import CSVReader from './CSVReader';
import ConvertMenu from './ConvertMenu';
import ConvertSheet from './ConvertSheet';
import { alertConverteds } from './converteds';
import PrintSheet from './PrintSheet';

export default function SpreadSheet() {
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

  const ischecked = () => {
    return lines.some((line) => {
      return line[0] === true;
    });
  };

  const table = useRef<ReturnType<typeof jspreadsheet> | null>(null);
  const jRef = useRef<HTMLDivElement | null>(null);

  const setRowStyles = () => {
    const spreadsheets = document.querySelectorAll('.jexcel_content');
    for (const spreadsheet of spreadsheets) {
      const rows = spreadsheet.querySelectorAll('tr');
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, cellIndex) => {
          if (!(cellIndex % 9 === 1)) {
            cell.classList.add('readonly');
          } else {
            cell.classList.add('checkbox-cell');
          }
          if (index % 2 === 0) {
            cell.classList.add('even-row');
          }
        });
      });
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
        console.log(`checkbox-${index}`);
        if (checkbox) {
          checkbox.click();
        }
      });
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
        setCheckboxStyles();
      }
    }
  }, [options, lines]);

  return (
    <div>
      {!showSpreadSheet || isEmpty() ? (
        <div ref={jRef} style={{ display: 'none' }} />
      ) : (
        <div ref={jRef} className='print_none' />
      )}
      <br />
      {showSpreadSheet && !isEmpty() && (
        <div className='print_none'>
          <button
            className='inline-block text-md px-4 py-2 h-20 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
            onClick={() => {
              if (ischecked()) {
                closeSpreadSheet();
                setshowUploadButton(false);
                setshowConvertMenu(true);
                false;
                alertConverteds(lines);
              } else {
                alert('クリックポストに変換する注文にチェックを入れてください');
              }
            }}
          >
            クリックポスト変換
          </button>

          <button
            className='inline-block text-md px-4 py-2 h-20 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3 print_none'
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
  );
}
