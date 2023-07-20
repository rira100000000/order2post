import React, { useRef, useEffect, useState } from "react";
import jspreadsheet from "jspreadsheet-ce";

import "../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import CSVReader from "./CSVReader";
import CSVDownloader from "./CSVDownloader";

export default function SpreadSheet() {
  const jRef = useRef(null);

  const options = {
    data: [[]],
    minDimensions: [10, 10],
  };

  const [data, setData] = useState([]);

  const myTable = useRef(null);

  const isEmpty = () => {
    return data.length === 0;
  };

  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
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
