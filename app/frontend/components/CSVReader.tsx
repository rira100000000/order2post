import React, { useRef } from 'react';
import ReadMinne, { setMinneData } from '../minne';
import ReadCreema, { setCreemaData } from '../creema';
import { useCSVReader } from 'react-papaparse';
import useModal from '../hooks/useModal';

interface CSVReaderProps {
  openSpreadSheet: VoidFunction;
  setLines: React.Dispatch<
    React.SetStateAction<Array<Array<string | boolean>>>
  >;
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
          if (file.name.startsWith('orders')) {
            setMinneData(
              results.data,
              props.setLines,
              props.setService,
              anotherService,
              serviceData
            );
            props.openSpreadSheet();
            openModal();
          } else if (file.name.startsWith('tradenavi-list')) {
            setCreemaData(
              results.data,
              props.setLines,
              props.setService,
              anotherService,
              serviceData
            );
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
                  className='print_none inline-block text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-300 hover:border-transparent hover:text-white hover:bg-slate-500 hover:cursor-pointer m-3'
                >
                  最初からやり直す
                </div>
              </div>
            ) : (
              <div className='flex justify-center items-center w-full'>
                <div
                  {...getRootProps()}
                  className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 hover:cursor-pointer mt-4'
                  id='file_select_button'
                >
                  ファイルを選択
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
                if (file.name.includes('orders')) {
                  props.setLines(
                    serviceData.current.concat(await ReadMinne(results.data))
                  );
                  closeModal();
                } else if (file.name.includes('tradenavi-list')) {
                  props.setLines(
                    serviceData.current.concat(await ReadCreema(results.data))
                  );
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
                      className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 hover:cursor-pointer m-3'
                    >
                      はい
                    </div>
                    <button
                      className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 m-3'
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
