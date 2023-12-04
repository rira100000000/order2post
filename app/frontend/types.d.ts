export type ShippingInfo = {
  addressInfo: string;
  item: string;
  content: string;
};

export type Line = {
  checked: boolean;
  order: string[];
};
