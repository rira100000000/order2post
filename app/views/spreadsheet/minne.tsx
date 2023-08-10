const ReadMinne = (input) => {
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

  const lines: string[][] = [];

  for (let i = 1; i < input.length; i++) {
    const order = input[i];
    if (order[STATUS] !== '発送準備中') {
      continue;
    }
    const line: string[] = [];
    line.push('');
    line.push('minne\n' + order[ORDERNUM]);
    line.push(order[SHIPPING]);

    const items: string[] = [];
    const itemnums: string[] = [];
    const remarks: string[] = [];

    items.push(input[i][ITEM]);
    itemnums.push(input[i][ITEMNUM]);
    remarks.push(input[i][REMARKS]);

    while (input[i][ORDERNUM] === input[i + 1][ORDERNUM]) {
      items.push(input[i + 1][ITEM]);
      itemnums.push(input[i + 1][ITEMNUM]);
      remarks.push(input[i + 1][REMARKS]);
      i++;
    }

    line.push(items.join('\n'));
    line.push(itemnums.join('\n'));
    line.push(
      '〒' +
        order[POSTALCODE].slice(0, 3) +
        '-' +
        order[POSTALCODE].slice(3, 7) +
        '\n' +
        order[ADDRESS1] +
        '\n' +
        order[ADDRESS2] +
        '\n' +
        order[NAME] +
        '\n' +
        order[TEL]
    );
    line.push(order[DATE]);
    line.push(remarks.join('\n'));
    lines.push(line);
  }
  return lines;
};

export default ReadMinne;
