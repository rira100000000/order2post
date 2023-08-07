function App() {
  return (
    <>
      <div className='flex justify-center items-center w-full'>
        <div className='flex flex-col items-center text-yellow-800'>
          <h1 className='text-5xl mt-2 mb-2'>CSV変換君</h1>
          <p className='md:text-xl border-b-8 border-red-500 mt-4 mb-4'>
            minne,Creemaを使うハンドメイド作家のための発送作業支援サービス！
          </p>
          <a
            href='/users/sign_up'
            className='text-xl px-4 py-2 mt-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500'
          >
            サインアップ
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
