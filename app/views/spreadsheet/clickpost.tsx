interface ShippingInfo {
  addressInfo: string;
  content: string;
}

const outputToConvertSheet = (shippingInfos: ShippingInfo[]) => {
  const POSTALCODE = 0;
  const ADDRESS1 = 1;
  const ADDRESS2 = 2;
  const NAME = 3;

  const header = [
    'お届け先郵便番号',
    'お届け先氏名',
    'お届け先敬称',
    'お届け先住所1行目',
    'お届け先住所2行目',
    'お届け先住所3行目',
    'お届け先住所4行目',
    '内容品'
  ];

  const splitAddress = (address: string) => {
    const numericIndex = address.search(/[0-9０-９]/); // 最初の数値のインデックスを検索

    if (numericIndex !== -1) {
      const beforeNumeric = address.slice(0, numericIndex); // 数値が出現する前の部分
      const afterNumeric = address.slice(numericIndex); // 数値が出現した後の部分
      return [beforeNumeric, afterNumeric];
    } else {
      return [address, ''];
    }
  };

  const lines: string[][] = [];
  lines.push(header);

  for (const shippingInfo of shippingInfos) {
    const line: string[] = [];
    const addressInfos = shippingInfo['addressInfo'].split('\n');

    line.push(
      addressInfos[POSTALCODE].slice(1, 4) +
        addressInfos[POSTALCODE].slice(5, 9)
    );
    line.push(addressInfos[NAME]);
    line.push('様');

    const splitedAddress1 = splitAddress(addressInfos[ADDRESS1]);
    line.push(splitedAddress1[0]);
    line.push(splitedAddress1[1]);

    const splitedAddress2 = splitAddress(addressInfos[ADDRESS2]);
    line.push(splitedAddress2[0]);
    line.push(splitedAddress2[1]);

    line.push(shippingInfo['content']);

    lines.push(line);
  }
  console.log(lines);

  return lines;
};

const outputToClickpost = (shippingInfos: ShippingInfo[]) => {
  const POSTALCODE = 0;
  const ADDRESS1 = 1;
  const ADDRESS2 = 2;
  const NAME = 3;

  const header = [
    'お届け先郵便番号',
    'お届け先氏名',
    'お届け先敬称',
    'お届け先住所1行目',
    'お届け先住所2行目',
    'お届け先住所3行目',
    'お届け先住所4行目',
    '内容品'
  ];

  const splitAddress = (address: string) => {
    const numericIndex = address.search(/[0-9０-９]/); // 最初の数値のインデックスを検索

    if (numericIndex !== -1) {
      const beforeNumeric = address.slice(0, numericIndex); // 数値が出現する前の部分
      const afterNumeric = address.slice(numericIndex); // 数値が出現した後の部分
      return [beforeNumeric, afterNumeric];
    } else {
      return [address, ''];
    }
  };

  const lines: string[][] = [];
  lines.push(header);

  for (const shippingInfo of shippingInfos) {
    const line: string[] = [];
    const addressInfos = shippingInfo['addressInfo'].split('\n');

    line.push(
      addressInfos[POSTALCODE].slice(1, 4) +
        addressInfos[POSTALCODE].slice(5, 9)
    );
    line.push(addressInfos[NAME]);
    line.push('様');

    const splitedAddress1 = splitAddress(addressInfos[ADDRESS1]);
    line.push(splitedAddress1[0]);
    line.push(splitedAddress1[1]);

    const splitedAddress2 = splitAddress(addressInfos[ADDRESS2]);
    line.push(splitedAddress2[0]);
    line.push(splitedAddress2[1]);

    line.push(shippingInfo['content']);

    lines.push(line);
  }

  return lines;
};

export default outputToConvertSheet;
