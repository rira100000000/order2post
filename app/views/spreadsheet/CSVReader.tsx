import React, { useRef } from 'react';
import ReadMinne from './minne';
import ReadCreema from './creema';
import { useCSVReader } from 'react-papaparse';
import useModal from '../../frontend/src/hooks/useModal';

export default function CSVReader(props) {
  const { CSVReader } = useCSVReader();
  const { Modal, openModal, closeModal } = useModal();
  const service = useRef<string>('');
  const anotherService = useRef<string>('');
  const serviceData = useRef<string[][]>([]);

  const setMinneData = (data) => {
    openModal();
    const minneData: string[][] = ReadMinne(data);
    props.setLines(minneData);
    serviceData.current = minneData;
    service.current = 'minne';
    anotherService.current = 'Creema';
  };

  const setCreemaData = (data) => {
    openModal();
    const creemaData: string[][] = ReadCreema(data);
    props.setLines(creemaData);
    serviceData.current = creemaData;
    service.current = 'Creema';
    anotherService.current = 'minne';
  };

  return (
    <>
      <CSVReader
        onUploadAccepted={(results: any, file: any) => {
          {
            file.name.includes('orders') && setMinneData(results.data);
          }
          {
            file.name.includes('tradenavi-list') && setCreemaData(results.data);
          }
        }}
      >
        {({ getRootProps }: any) => (
          <>
            {service.current ? (
              <div className='flex items-center w-full'>
                <div
                  {...getRootProps()}
                  class='inline-block text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-300 hover:border-transparent hover:text-white hover:bg-slate-500 hover:cursor-pointer m-3'
                >
                  最初からやり直す
                </div>
              </div>
            ) : (
              <div className='flex justify-center items-center w-full'>
                <div
                  {...getRootProps()}
                  class='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 hover:cursor-pointer mt-4 lg:mt-0'
                  id='file_select_button'
                >
                  ファイルを選択
                </div>
              </div>
            )}
          </>
        )}
      </CSVReader>
      <Modal>
        <div className='bg-white border h-40 p-4 rounded-md'>
          <div>
            {service.current}のデータが読み込まれました。{'\n'}
            続けて{anotherService.current}の注文情報を入力しますか？{'\n'}
          </div>
          <div className='m-5'>
            <CSVReader
              onUploadAccepted={(results: any, file: any) => {
                closeModal();
                {
                  file.name.includes('orders') &&
                    props.setLines(
                      serviceData.current.concat(ReadMinne(results.data))
                    );
                }
                {
                  file.name.includes('tradenavi-list') &&
                    props.setLines(
                      serviceData.current.concat(ReadCreema(results.data))
                    );
                }
              }}
            >
              {({ getRootProps }: any) => (
                <>
                  <div className='flex justify-center items-center w-full'>
                    <div
                      {...getRootProps()}
                      class='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 hover:cursor-pointer m-3'
                    >
                      はい
                    </div>
                    <button
                      className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
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
