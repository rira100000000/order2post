import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { updateConverteds } from '../converteds';

type shippingInfo = {
  addressInfo: string;
  item: string;
  content: string;
};
type setShippingInfos = React.Dispatch<React.SetStateAction<shippingInfo[]>>;
type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;
type Conversions = {
  [key: string]: string;
};

interface IndividualConvertFormProps {
  lines: Array<Array<string | boolean>>;
  conversions: Conversions;
  setShippingInfos: setShippingInfos;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
}

export default function IndividualConvertForm(
  props: IndividualConvertFormProps
) {
  const NEEDCONVERT = 0;
  const ITEM = 3;
  const ADDRESS = 5;
  const [items, setItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const initNewConversions = () => {
    const keys = Object.keys(props.conversions);
    const initialConversions = {};
    for (const key of keys) {
      initialConversions[key] = props.conversions[key];
      console.log('response.data[key]=' + props.conversions[key]);
    }
    return initialConversions;
  };

  const [newConversions, setNewConversions] = useState({});

  const calcShippingInfos = () => {
    const shippingInfos: shippingInfo[] = [];
    const conversions = currentConversions();

    for (const line of props.lines) {
      if (line[0] === true) {
        const item = (line[ITEM] as string).split('\n')[NEEDCONVERT];
        const content = conversions[line[ITEM] as string];
        console.log(content);
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

  const currentConversions = () => {
    return isMounted ? newConversions : props.conversions;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    let tmpNewConversions = {};
    if (!isMounted) {
      setNewConversions(initNewConversions());
      tmpNewConversions = initNewConversions();
    } else {
      tmpNewConversions = { ...newConversions };
    }

    setIsMounted(true);

    tmpNewConversions[item] = event.target.value;
    setNewConversions(tmpNewConversions);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contentInputs = document.querySelectorAll(
      'input[name="individual_content"]'
    );
    for (const input of contentInputs) {
      if (!input['value']) {
        alert('個別設定を行う場合、全ての欄を入力してください error=2');
        return;
      }
    }

    let conversions = {};
    if (!isMounted) {
      setNewConversions(initNewConversions());
      conversions = initNewConversions();
    } else {
      conversions = { ...newConversions };
    }

    for (const key in conversions) {
      if (!conversions[key]) {
        alert('個別設定を行う場合、全ての欄を入力してください error=3');
        return;
      } else {
        console.log('conversion=' + conversions[key]);
      }
    }
    props.setShippingInfos(calcShippingInfos());

    axios
      .post('/conversions', { conversions: conversions })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    updateConverteds(props.lines);
    props.setshowConvertMenu(false);
    props.setshowConvertSheet(true);
  };

  const convertform = () => {
    const result: React.JSX.Element[] = [];

    items.forEach((item, index) => {
      const conversion = currentConversions();
      result.push(
        <div key={`content_${index}`} className='w-full flex items-center'>
          <span className={`item_${index} md:w-64 flex flex-wrap`}>{item}</span>
          <input
            type='text'
            name='individual_content'
            id={`content_${index}`}
            className='text-md w-60 px-2 py-2 leading-none border rounded border-slate-300 m-1 ml-auto'
            value={conversion[item] || ''}
            placeholder='ex)アクセサリー'
            onChange={(event) => handleChange(event, item)}
          />
        </div>
      );
    });

    return result;
  };

  useEffect(() => {
    let orderedItem: string[] = [];
    props.lines.forEach((line) => {
      if (line[0] === true) {
        orderedItem = orderedItem.concat((line[ITEM] as string).split('\n'));
      }
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
          className='inline-block text-md px-4 py-2 h-10 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 hover:cursor-pointer m-3'
        />
      </div>
    </form>
  );
}
