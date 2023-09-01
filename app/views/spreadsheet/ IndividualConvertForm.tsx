import React from 'react';

type shippingInfo = {
  addressInfo: string; //注文一覧の住所欄の情報
  content: string; // 内容品
};
type setShippingInfos = React.Dispatch<React.SetStateAction<shippingInfo[]>>;
type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;
type Conversions = {
  item: string;
  content: string;
};

interface IndividualConvertFormProps {
  lines: string[][];
  conversions: Conversions;
  setShippingInfos: setShippingInfos;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
}

export default function IndividualConvertForm(
  props: IndividualConvertFormProps
) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const convertform = () => {
    const result: React.JSX.Element[] = [];
    let index = 0;

    props.lines.forEach((line) => {
      const items = line[3].split('\n');
      items.forEach((item) => {
        result.push(
          <div>
            {item}
            <input
              type='text'
              name='content'
              className={`content_${index} inline-block text-md w-60 px-2 py-2 leading-none border rounded border-slate-300 m-0`}
              value={item}
            />
          </div>
        );
      });
    });
    return result;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-center items-center'>
        <div>{convertform()}</div>
      </div>
      <div className='flex justify-center items-center'>
        <input
          type='submit'
          value='個別変換'
          className='inline-block text-md px-4 py-2 h-10 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 hover:cursor-pointer m-3'
        />
      </div>
    </form>
  );
}
