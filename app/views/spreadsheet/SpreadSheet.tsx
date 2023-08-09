import React, { useRef, useEffect, useState } from 'react';
import jspreadsheet from 'jspreadsheet-ce';

import '../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css';
import CSVReader from './CSVReader';
import CSVDownloader from './CSVDownloader';

export default function SpreadSheet() {
  const options: any = {
    data: [[]],
    minDimensions: [0, 0] as [number, number],
    wordWrap: true,
    columns: [
      { title: '変換対象選択', type: 'checkbox', width: 100 },
      { title: '注文番号', width: 80 },
      { title: '発送方法', width: 120 },
      { title: '商品名', width: 250 },
      { title: '数量', width: 50 },
      { title: '発送先', width: 300 },
      { title: '注文日', width: 100 },
      { title: '備考', width: 300 }
    ]
  };
  const [data, setData] = useState<string[][]>([]);

  const isEmpty = () => {
    return data.length === 0;
  };

  const myTable = useRef<ReturnType<typeof jspreadsheet> | null>(null);
  const jRef = useRef<HTMLDivElement | null>(null);

  const setRowStyles = () => {
    if (myTable.current) {
      const columns = myTable.current.getHeaders().length;

      for (let i = 0; i < data.length; i++) {
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
    } else {
      if (myTable.current) {
        myTable.current.setData(data);
        setRowStyles();
      }
    }
  }, [options, data]);

  return (
    <div>
      {isEmpty() ? (
        <div ref={jRef} style={{ display: 'none' }} />
      ) : (
        <div ref={jRef} />
      )}
      <br />
      <CSVReader setData={setData} />
      {!isEmpty() && <CSVDownloader data={data} />}
    </div>
  );
}
