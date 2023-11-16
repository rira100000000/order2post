import React from 'react';
import ReactDOM from 'react-dom/client';
import SpreadSheet from './components/SpreadSheet';

const element: HTMLElement | null = document.getElementById('email');
console.log(element?.dataset.email);
const current_user_email: string = element?.dataset.email || '';
ReactDOM.createRoot(element!).render(
  // <React.StrictMode>
  <SpreadSheet current_user_email={current_user_email} />
  // </React.StrictMode>
);
