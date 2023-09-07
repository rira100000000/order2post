import React, { useState, useEffect } from 'react';
import axios from 'axios';

type shippingInfo = {
  addressInfo: string;
  item: string;
  content: string;
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
  const [newConversions, setNewConversions] = useState({});
  const [items, setItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const calcShippingInfos = () => {
    const shippingInfos: shippingInfo[] = [];
    const conversions = currentConversions();

    for (const line of props.lines) {
      const item = line[3].split('\n')[0];
      const content = conversions[item];
      let shippingInfo = {
        addressInfo: line[5],
        item: item,
        content: content
      };

      shippingInfos.push(shippingInfo);
    }
    return shippingInfos;
  };

  const currentConversions = () => {
    return isMounted ? newConversions : props.conversions;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    let tmpNewConversions = {};
    if (isMounted) {
      tmpNewConversions = { ...newConversions };
    } else {
      tmpNewConversions = { ...props.conversions };
      setIsMounted(true);
    }
    tmpNewConversions[item] = event.target.value;
    setNewConversions(tmpNewConversions);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const conversions = currentConversions();

    for (const key in conversions) {
      if (conversions.hasOwnProperty(key)) {
        if (!conversions[key]) {
          alert('個別設定を使う場合、全ての欄を入力してください');
          return;
        }
      }
    }
    props.setShippingInfos(calcShippingInfos());

    axios
      .post('/conversions', { conversions: newConversions })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    props.setshowConvertMenu(false);
    props.setshowConvertSheet(true);
  };

  const convertform = () => {
    const result: React.JSX.Element[] = [];
    let index = 0;
    items.forEach((item) => {
      const conversion = currentConversions();
      result.push(
        <div>
          <span className={`item_${index}`}>{item}</span>
          <input
            key={`content_${index}`}
            type='text'
            name='content'
            className={`content_${index} inline-block text-md w-60 px-2 py-2 leading-none border rounded border-slate-300 m-0`}
            value={conversion[item] || ''}
            onChange={(event) => handleChange(event, item)}
          />
        </div>
      );
      index++;
    });

    return result;
  };

  useEffect(() => {
    let orderedItem: string[] = [];
    props.lines.forEach((line) => {
      orderedItem = orderedItem.concat(line[3].split('\n'));
    });

    //重複の削除
    const itemSet = new Set(orderedItem);
    setItems([...itemSet]);

    const initialConversions = {};
    for (const item of itemSet) {
      initialConversions[item] = props.conversions[item];
    }
    setNewConversions(initialConversions);

    const csrfTokenElement = document.querySelector('#csrf-token');
    if (csrfTokenElement) {
      const csrfToken = csrfTokenElement.getAttribute('data-token');
      axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    } else {
      console.error('CSRF Token element not found');
    }
  }, []);

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
