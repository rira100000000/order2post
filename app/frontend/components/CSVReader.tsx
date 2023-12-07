import React, { useRef } from 'react';
import { useCSVReader } from 'react-papaparse';
import useModal from '../hooks/useModal';
import { setData, setDataInModal } from '../setData';
import discribe from '../images/discribe.png';
import type { Line } from '../types.d.ts';

interface CSVReaderProps {
  openSpreadSheet: VoidFunction;
  setLines: React.Dispatch<React.SetStateAction<Array<Line>>>;
  service: string;
  setService: React.Dispatch<React.SetStateAction<string>>;
}

export default function CSVReader(props: CSVReaderProps) {
  const { CSVReader } = useCSVReader();
  const { Modal, openModal, closeModal } = useModal();

  const anotherService = useRef<string>('');
  const serviceData = useRef<Array<Array<string | boolean>>>([]);

  return (
    <>
      <CSVReader
        onUploadAccepted={(results: any, file: any) => {
          const uploadResult = setData(
            file,
            results,
            props.setLines,
            props.setService,
            anotherService,
            serviceData
          );
          if (uploadResult !== 'unknown') {
            props.openSpreadSheet();
            openModal();
          } else {
            alert('minneまたはCreemaの注文情報を選択してください');
          }
        }}
      >
        {({ getRootProps }: any) => (
          <div className='print_none'>
            {props.service ? (
              <div className='flex items-center w-full'>
                <div
                  {...getRootProps()}
                  className='print_none inline-block text-sm px-1 leading-none text-slate-500 border-slate-300 underline hover:no-underline hover:cursor-pointer m-3'
                >
                  <p>最初からやり直す</p>
                </div>
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center w-full'>
                <div
                  {...getRootProps()}
                  className='inline-block w-40 text-lg text-center px-4 py-2 leading-none border rounded text-white bg-slate-800 border-slate-800 hover:border-transparent hover:text-white hover:bg-amber-600 hover:cursor-pointer mt-4'
                  id='file_select_button'
                >
                  ファイルを選択
                </div>
                <div className='balloon'>
                  minne、Creemaで
                  <br />
                  ダウンロードした注文データを
                  <br />
                  選択してください
                </div>
              </div>
            )}
          </div>
        )}
      </CSVReader>
      <Modal>
        <div className='border h-40 p-4 rounded-md print_none'>
          <div>
            {props.service}のデータが読み込まれました。{'\n'}
            続けて{anotherService.current}の注文情報を入力しますか？{'\n'}
          </div>
          <div className='m-5'>
            <CSVReader
              onUploadAccepted={async (results: any, file: any) => {
                const uploadResult = await setDataInModal(
                  file,
                  results,
                  props.setLines,
                  serviceData
                );
                if (uploadResult !== 'unknown') {
                  closeModal();
                } else {
                  alert('minneまたはCreemaの注文情報を選択してください');
                }
              }}
            >
              {({ getRootProps }: any) => (
                <>
                  <div className='flex justify-center items-center w-full'>
                    <div
                      {...getRootProps()}
                      id='yes_button'
                      className='w-20 inline-block text-sm text-center px-4 py-2 leading-none border rounded text-white border-slate-800 bg-slate-800 hover:border-transparent hover:bg-amber-600 hover:cursor-pointer m-3'
                    >
                      はい
                    </div>
                    <button
                      className='w-20 inline-block text-sm text-center px-4 py-2 leading-none border rounded text-white border-slate-800 bg-slate-800 hover:border-transparent hover:bg-amber-600 hover:cursor-pointer m-3'
                      onClick={closeModal}
                    >
                      いいえ
                    </button>
                  </div>
                </>
              )}
            </CSVReader>
          </div>
        </div>
      </Modal>
    </>
  );
}
