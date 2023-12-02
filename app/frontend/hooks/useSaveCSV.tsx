import { useCallback } from 'react';
import Encoding from 'encoding-japanese';
import { saveAs } from 'file-saver';

const useSaveCSV = () => {
  const saveCSV = useCallback((csvData: string[][]) => {
    let csvString = csvData.map((line) => line.join(',')).join('\n');

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
  }, []);

  return saveCSV;
};

export default useSaveCSV;
