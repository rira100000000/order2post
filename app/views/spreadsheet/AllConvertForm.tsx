import React from 'react';

type SetshowConvertMenu = (value: boolean) => void;
type SetshowConvertSheet = (value: boolean) => void;

interface AllConvertFormProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setshowConvertMenu: SetshowConvertMenu;
  setshowConvertSheet: SetshowConvertSheet;
}

export default function AllConvertForm(props: AllConvertFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.content !== '') {
      props.setshowConvertMenu(false);
      props.setshowConvertSheet(true);
    } else {
      alert('内容品を設定して下さい');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-center items-center'>
        <label className='text-sm mt-3'>
          内容品 ※最大15文字
          <br />
          <input
            id='convertForm'
            type='text'
            name='content'
            onChange={handleChange}
            className='inline-block text-md w-60 px-2 py-2 leading-none border rounded border-slate-300 m-0'
          />
        </label>
      </div>
      <div className='flex justify-center items-center'>
        <input
          type='submit'
          value='クリックポスト変換'
          className='inline-block text-md px-4 py-2 h-10 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 hover:cursor-pointer m-3'
        />
      </div>
    </form>
  );
}
