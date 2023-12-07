import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { csrfTokenCheck } from '../csrfTokenCheck.ts';
import { updateConverteds } from '../converteds';
import makeShippingInfos from '../makeShippingInfos';
import type { ShippingInfo, Line } from '../types.d.ts';

type setShippingInfos = React.Dispatch<React.SetStateAction<ShippingInfo[]>>;
type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;
type Conversions = {
  [key: string]: string;
};

interface IndividualConvertFormProps {
  lines: Array<Line>;
  conversions: Conversions;
  setShippingInfos: setShippingInfos;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
}

export default function IndividualConvertForm(
  props: IndividualConvertFormProps
) {
  const ITEM = 2;

  const [items, setItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const initNewConversions = () => {
    const keys = Object.keys(props.conversions);
    const initialConversions = {};
    for (const key of keys) {
      initialConversions[key] = props.conversions[key];
    }
    return initialConversions;
  };

  const [newConversions, setNewConversions] = useState({});
  const currentConversions = () => {
    return isMounted ? newConversions : props.conversions;
  };

  const conversions = currentConversions();

  const shippingInfos = makeShippingInfos(conversions, props.lines);
  const calcConversions = () => {
    if (!isMounted) {
      setNewConversions(initNewConversions());
      return initNewConversions();
    } else {
      return { ...newConversions };
    }
  };
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contentInputs = document.querySelectorAll(
      'input[name="individual_content"]'
    );
    for (const input of contentInputs) {
      if (!input['value']) {
        alert('個別設定を行う場合、全ての欄を入力してください');
        return;
      } else if (input['value'].length > 15) {
        alert(`内容品は15文字以内で指定してください\n${input['value']}`);
        return;
      }
    }

    const conversions = calcConversions();

    props.setShippingInfos(shippingInfos);

    axios
      .post('/conversions', { conversions: conversions })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });

    updateConverteds(props.lines);
    props.setshowConvertMenu(false);
    props.setshowConvertSheet(true);
  };

  useEffect(() => {
    let orderedItem: string[] = [];
    props.lines.forEach((line) => {
      if (line['checked'] === true) {
        orderedItem = orderedItem.concat(line['order'][ITEM].split('\n'));
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

    csrfTokenCheck();
  }, []);

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='flex justify-center items-center'>
        <div>
          <Convertform
            items={items}
            currentConversions={currentConversions}
            setNewConversions={setNewConversions}
            setIsMounted={setIsMounted}
            calcConversions={calcConversions}
          />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <input
          type='submit'
          value='個別変換'
          className='inline-block text-md w-40 px-4 py-2 h-10 leading-none border rounded bg-slate-800 border-slate-800 text-white hover:border-transparent hover:bg-amber-600 hover:cursor-pointer m-3'
        />
      </div>
    </form>
  );
}

const Convertform = ({
  items,
  currentConversions,
  setNewConversions,
  setIsMounted,
  calcConversions
}) => {
  const result: React.JSX.Element[] = [];

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    const tmpNewConversions = calcConversions();

    setIsMounted(true);

    tmpNewConversions[item] = event.target.value;
    setNewConversions(tmpNewConversions);
  };

  items.forEach((item, index) => {
    const conversion = currentConversions();
    let bgColor = '';
    if (index % 2 === 0) {
      bgColor = 'bg-gray-white';
    } else {
      bgColor = 'gb-white';
    }

    result.push(
      <tr key={`${item}`} className={`${bgColor}`}>
        <td className={`${bgColor}`}>
          <span className={`item_${index} flex flex-wrap font-bold`}>
            {item}
          </span>
        </td>
        <td className={`${bgColor}`}>
          <input
            type='text'
            name='individual_content'
            id={`content_${index}`}
            className='text-md w-60 px-2 py-2 leading-none border rounded border-slate-300 m-1 ml-auto'
            value={conversion[item] || ''}
            onChange={(event) => handleOnChange(event, item)}
          />
          <p className='text-xs'>入力例:アクセサリー、衣類,おもちゃ</p>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <tbody>{result}</tbody>
    </table>
  );
};
