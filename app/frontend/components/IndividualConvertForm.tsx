import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { csrfTokenCheck } from '../csrfTokenCheck.ts';
import { updateConverteds } from '../converteds';
import makeShippingInfos from '../makeShippingInfos';
import type { ShippingInfo } from '../types.d.ts';

type setShippingInfos = React.Dispatch<React.SetStateAction<ShippingInfo[]>>;
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
  const ITEM = 3;

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

  const handleOnChange = (
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

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contentInputs = document.querySelectorAll(
      'input[name="individual_content"]'
    );
    for (const input of contentInputs) {
      if (!input['value']) {
        alert('個別設定を行う場合、全ての欄を入力してください');
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
      }
    }
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

  const convertform = () => {
    const result: React.JSX.Element[] = [];

    items.forEach((item, index) => {
      const conversion = currentConversions();
      result.push(
        <div key={`${item}`} className='w-full flex items-center'>
          <span className={`item_${index} md:w-64 flex flex-wrap`}>{item}</span>
          <input
            type='text'
            name='individual_content'
            id={`content_${index}`}
            className='text-md w-60 px-2 py-2 leading-none border rounded border-slate-300 m-1 ml-auto'
            value={conversion[item] || ''}
            placeholder='ex)アクセサリー'
            onChange={(event) => handleOnChange(event, item)}
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

    csrfTokenCheck();
  }, []);

  return (
    <form onSubmit={handleOnSubmit}>
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
