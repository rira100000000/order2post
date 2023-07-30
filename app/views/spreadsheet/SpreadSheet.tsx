import React, { useRef, useEffect, useState } from 'react';
import jspreadsheet from 'jspreadsheet-ce';

import '../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css';
import CSVReader from './CSVReader';
import CSVDownloader from './CSVDownloader';

export default function SpreadSheet() {
  const options = {
    data: [[]],
    minDimensions: [10, 10] as [number, number]
  };

  const [data, setData] = useState<string[][]>([]);

  const isEmpty = () => {
    return data.length === 0;
  };

  const myTable = useRef<ReturnType<typeof jspreadsheet> | null>(null);
  const jRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (jRef.current && !myTable.current) {
      myTable.current = jspreadsheet(jRef.current, options);
    } else {
      if (myTable.current) {
        myTable.current.setData(data);
      }
    }
  }, [options, data]);

  return (
    <div>
      <div ref={jRef} />
      <br />
      <CSVReader setData={setData} />
      {!isEmpty() && <CSVDownloader data={data} />}
    </div>
  );
}
