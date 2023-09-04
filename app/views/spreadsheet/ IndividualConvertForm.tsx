import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [newConversions, setNewConversions] = useState({});
  const [items, setItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

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

    for (const key in newConversions) {
      if (newConversions.hasOwnProperty(key)) {
        if (!newConversions[key]) {
          alert('個別設定を使う場合、全ての欄を入力してください');
          return;
        }
      }
    }

    axios
      .post('/conversions', { conversions: newConversions })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const conversionValue = (item) => {
    if (isMounted) {
      return newConversions[item];
    } else {
      return props.conversions[item];
    }
  };

  const convertform = () => {
    const result: React.JSX.Element[] = [];
    let index = 0;
    items.forEach((item) => {
      result.push(
        <div>
          <span className={`item_${index}`}>{item}</span>
          <input
            key={`content_${index}`}
            type='text'
            name='content'
            className={`content_${index} inline-block text-md w-60 px-2 py-2 leading-none border rounded border-slate-300 m-0`}
            value={conversionValue(item) || ''}
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
