import { flattenDiagnosticMessageText } from 'typescript';
import { checkConverteds } from './converteds';
import type { Line } from './types.d.ts';

const ReadCreema = async (csvDatas: string[][]) => {
  const STATUS = 2;
  const ORDERNUM = 0;
  const SHIPPING = 25;
  const ITEM = 6;
  const ITEMNUM = 20;
  const POSTALCODE = 34;
  const ADDRESS1 = 35;
  const NAME = 33;
  const TEL = 36;
  const DATE = 1;
  const REMARKS = 22;

  const lines: Array<Line> = [];
  const compareDatas: Array<Line> = [];

  for (const csvData of csvDatas) {
    compareDatas.push({
      checked: true,
      order: ['Creema\n' + csvData[ORDERNUM]]
    });
  }
  const converteds = await checkConverteds(compareDatas);

  for (let i = 1; i < csvDatas.length; i++) {
    const csvData = csvDatas[i];
    if (csvData[STATUS] !== '発送準備') {
      continue;
    }
    const line: Line = { checked: false, order: [] };

    if (
      converteds.some((converted) => {
        return converted === `Creema\n${csvData[ORDERNUM]}`;
      })
    ) {
      line['checked'] = false;
    } else {
      line['checked'] = csvData[SHIPPING] === 'クリックポスト' ? true : false;
    }

    line['order'].push('Creema\n' + csvData[ORDERNUM]);
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

export const setCreemaData = async (
  data: string[][],
  setLines,
  setService,
  anotherService,
  serviceData
) => {
  const creemaData: Array<Line> = await ReadCreema(data);
  setLines(creemaData);
  serviceData.current = creemaData;
  setService('Creema');
  anotherService.current = 'minne';
};

export default ReadCreema;
