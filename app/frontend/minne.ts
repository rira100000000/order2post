import { transformWithEsbuild } from 'vite';
import { checkConverteds } from './converteds';
import type { Line } from './types.d.ts';

const ReadMinne = async (csvDatas: string[][]) => {
  const STATUS = 2;
  const ORDERNUM = 0;
  const SHIPPING = 7;
  const ITEM = 6;
  const ITEMNUM = 11;
  const POSTALCODE = 21;
  const ADDRESS1 = 22;
  const ADDRESS2 = 23;
  const NAME = 24;
  const TEL = 25;
  const DATE = 1;
  const REMARKS = 13;

  const lines: Array<Line> = [];
  const compareDatas: Array<Line> = [];

  for (const csvData of csvDatas) {
    compareDatas.push({
      checked: true,
      order: ['minne\n' + csvData[ORDERNUM]]
    });
  }
  const converteds = await checkConverteds(compareDatas);

  for (let i = 1; i < csvDatas.length; i++) {
    const csvData = csvDatas[i];
    if (csvData[STATUS] !== '発送準備中') {
      continue;
    }
    const line: Line = { checked: false, order: [] };

    if (
      converteds.some((converted) => {
        return converted === `minne\n${csvData[ORDERNUM]}`;
      })
    ) {
      line['checked'] = false;
    } else {
      line['checked'] = csvData[SHIPPING] === 'クリックポスト' ? true : false;
    }

    line['order'].push('minne\n' + csvData[ORDERNUM]);
    line['order'].push(csvData[SHIPPING]);

    const items: string[] = [];
    const itemnums: string[] = [];
    const remarks: string[] = [];

    items.push(csvDatas[i][ITEM]);
    itemnums.push(csvDatas[i][ITEMNUM]);
    remarks.push(csvDatas[i][REMARKS]);

    while (csvDatas[i][ORDERNUM] === csvDatas[i + 1][ORDERNUM]) {
      items.push(csvDatas[i + 1][ITEM]);
      itemnums.push(csvDatas[i + 1][ITEMNUM]);
      remarks.push(csvDatas[i + 1][REMARKS]);
      i++;
    }

    line['order'].push(items.join('\n'));
    line['order'].push(itemnums.join('\n'));
    line['order'].push(
      '〒' +
        csvData[POSTALCODE].slice(0, 3) +
        '-' +
        csvData[POSTALCODE].slice(3, 7) +
        '\n' +
        csvData[ADDRESS1] +
        '\n' +
        csvData[ADDRESS2] +
        '\n' +
        csvData[NAME] +
        '\n' +
        csvData[TEL]
    );
    line['order'].push(csvData[DATE]);
    line['order'].push(remarks.join('\n'));
    lines.push(line);
  }
  return lines;
};

export const setMinneData = async (
  data: string[][],
  setLines,
  setService,
  anotherService,
  serviceData
) => {
  const minneData: Array<Line> = await ReadMinne(data);
  setLines(minneData);
  serviceData.current = minneData;
  setService('minne');
  anotherService.current = 'Creema';
};
export default ReadMinne;
