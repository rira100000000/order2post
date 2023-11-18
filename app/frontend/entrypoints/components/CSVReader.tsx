import React, { useRef } from 'react';
import ReadMinne from '../minne';
import ReadCreema from '../creema';
import { useCSVReader } from 'react-papaparse';
import useModal from '../hooks/useModal';

interface CSVReaderProps {
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

  const setMinneData = async (data: string[][]) => {
    openModal();
    const minneData: Array<Array<string | boolean>> = await ReadMinne(data);
    props.setLines(minneData);
    serviceData.current = minneData;
    props.setService('minne');
    anotherService.current = 'Creema';
  };

  const setCreemaData = async (data: string[][]) => {
    openModal();
    const creemaData: Array<Array<string | boolean>> = await ReadCreema(data);
    props.setLines(creemaData);
    serviceData.current = creemaData;
    props.setService('Creema');
    anotherService.current = 'minne';
  };

  return (
    <>
      <CSVReader
        onUploadAccepted={(results: any, file: any) => {
          if (file.name.startsWith('orders')) {
            setMinneData(results.data);
          } else if (file.name.startsWith('tradenavi-list')) {
            setCreemaData(results.data);
          } else {
            alert('minneまたはCreemaの注文情報を選択してください');
          }
        }}
      >
        {({ getRootProps }: any) => (
          <>
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
                  className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-600 border-amber-600 hover:border-transparent hover:text-white hover:bg-amber-600 hover:cursor-pointer mt-4 lg:mt-0'
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