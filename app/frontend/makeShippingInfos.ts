import type { ShippingInfo } from './types.d.ts';

const makeShippingInfos = (conversion, lines) => {
  const NEEDCONVERT = 0;
  const ITEM = 3;
  const ADDRESS = 5;

  const shippingInfos: ShippingInfo[] = [];

  for (const line of lines) {
    if (line[NEEDCONVERT] === true) {
      const item = (line[ITEM] as string).split('\n')[0]; // 先頭の商品を内容品の代表とする
      let content;

      if (typeof conversion === 'string') {
        content = conversion;
      } else if (typeof conversion === 'object' && conversion !== null) {
        content = conversion[line[ITEM] as string];
      } else {
        console.log('Invalid conversion type');
      }

      let shippingInfo = {
        addressInfo: line[ADDRESS] as string,
        item: item,
        content: content
      };

      shippingInfos.push(shippingInfo);
    }
  }
  return shippingInfos;
};

export default makeShippingInfos;
