import React from 'react';
import ReactDOM from 'react-dom/client';
import ConvertPage from '../components/ConvertPage';

const element: HTMLElement | null = document.getElementById('email');
const current_user_email: string = element?.dataset.email || '';
ReactDOM.createRoot(element!).render(
  // <React.StrictMode>
  <ConvertPage current_user_email={current_user_email} />
  // </React.StrictMode>
);
