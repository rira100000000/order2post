import React, { useEffect, useRef } from 'react';
import ReadMinne from './minne';
import ReadCreema from './creema';
import Papa from 'papaparse';
import useModal from '../../frontend/src/hooks/useModal';

export default function CSVReader(props) {
  const { Modal, openModal, closeModal } = useModal();
  const service = useRef<string>('');
  const anotherService = useRef<string>('');
  const serviceData = useRef<string[][]>([]);

  const setMinneData = (data) => {
    openModal();
    const minneData: string[][] = ReadMinne(data);
    serviceData.current = minneData;
    service.current = 'minne';
    anotherService.current = 'Creema';
    props.setLines(minneData);
  };

  const setCreemaData = (data) => {
    openModal();
    const creemaData: string[][] = ReadCreema(data);
    serviceData.current = creemaData;
    service.current = 'Creema';
    anotherService.current = 'minne';
    props.setLines(creemaData);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileData = event.target?.result as string;
        Papa.parse(fileData, {
          header: false,
          complete: (results) => {
            if (serviceData.current.length === 0) {
              if (selectedFile.name.includes('orders')) {
                setMinneData(results.data);
              } else if (selectedFile.name.includes('tradenavi-list')) {
                setCreemaData(results.data);
              }
            } else {
              if (selectedFile.name.includes('orders')) {
                props.setLines(
                  serviceData.current.concat(
                    ReadMinne(Papa.parse(fileData).data)
                  )
                );
              } else if (selectedFile.name.includes('tradenavi-list')) {
                props.setLines(
                  serviceData.current.concat(
                    ReadCreema(Papa.parse(fileData).data)
                  )
                );
              }
              closeModal();
            }
          }
        });
      };

      reader.readAsText(selectedFile);
    } else {
      console.log('ファイルが選択されていません');
      return; // ファイルが選択されていない場合は処理を中止
    }
  };

  return (
    <>
      {service.current ? (
        <div className='flex items-center w-full'>
          <label
            htmlFor='fileInput'
            className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
          >
            <span>最初からやり直す</span>
          </label>
          <input
            id='fileInput'
            name='restart'
            type='file'
            accept='.csv'
            style={{ display: 'none' }}
            onChange={(e) => {
              serviceData.current = [];
              onChangeFile(e);
            }}
          />
        </div>
      ) : (
        <div className='flex justify-center items-center w-full'>
          <label
            htmlFor='fileInput'
            className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
            id='file_select_button'
          >
            <span>ファイルを選択</span>
          </label>
          <input
            id='fileInput'
            name='fileInput'
            type='file'
            accept='.csv'
            style={{ display: 'none' }}
            onChange={onChangeFile}
          />
        </div>
      )}
      <Modal>
        <div className='bg-white border h-40 p-4 rounded-md'>
          <div>
            {service.current}のデータが読み込まれました。{'\n'}
            続けて{anotherService.current}の注文情報を入力しますか？{'\n'}
          </div>
          <div className='m-5'>
            <label
              htmlFor='continueInput'
              className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
            >
              <span>はい</span>
            </label>
            <input
              id='continueInput'
              name='continueInput'
              type='file'
              accept='.csv'
              style={{ display: 'none' }}
              onChange={onChangeFile}
            />
            <button
              className='inline-block text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-300 hover:border-transparent hover:text-white hover:bg-slate-500 hover:cursor-pointer m-3'
              onClick={closeModal}
            >
              いいえ
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
