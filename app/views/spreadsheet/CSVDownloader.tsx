import React from "react";

import { useCSVDownloader } from "react-papaparse";

export default function CSVDownloader(props) {
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <CSVDownloader
      type={Type.Button}
      filename={"clickpost"}
      bom={true}
      config={{
        delimiter: ",",
      }}
      data={props.data}
    >
      Download
    </CSVDownloader>
  );
}
