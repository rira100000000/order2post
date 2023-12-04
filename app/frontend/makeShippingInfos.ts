import type { ShippingInfo } from './types.d.ts';

const makeShippingInfos = (conversion, lines) => {
  const ITEM = 2;
  const ADDRESS = 4;

  const shippingInfos: ShippingInfo[] = [];

  for (const line of lines) {
    if (line['checked'] === true) {
      const item = line['order'][ITEM].split('\n')[0]; // 先頭の商品を内容品の代表とする
      let content;

      if (typeof conversion === 'string') {
        content = conversion;
      } else if (typeof conversion === 'object' && conversion !== null) {
        content = conversion[item];
      } else {
        console.log('Invalid conversion type');
      }

      let shippingInfo = {
        addressInfo: line['order'][ADDRESS],
        item: item,
        content: content
      };

      shippingInfos.push(shippingInfo);
    }
  }
  return shippingInfos;
};

export default makeShippingInfos;
