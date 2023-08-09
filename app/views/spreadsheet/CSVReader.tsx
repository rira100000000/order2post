import React from 'react';
import ReadMinne from './minne';
import ReadCreema from './creema';
import { useCSVReader } from 'react-papaparse';

export default function CSVReader(props) {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader
      onUploadAccepted={(results: any, file: any) => {
        console.log('---------------------------');
        console.log(results.data);
        console.log(file.name);
        console.log('---------------------------');
        {
          file.name.includes('orders') &&
            props.setData(ReadMinne(results.data));
        }
        {
          file.name.includes('tradenavi-list') &&
            props.setData(ReadCreema(results.data));
        }
      }}
    >
      {({ getRootProps }: any) => (
        <>
          <div className='flex justify-center items-center w-full'>
            <div
              {...getRootProps()}
              class='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 mt-4 lg:mt-0'
            >
              ファイルを選択
            </div>
          </div>
        </>
      )}
    </CSVReader>
  );
}
