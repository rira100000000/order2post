import React from 'react';
import { createRoot } from 'react-dom/client';
import Setting from '../../views/spreadsheet/Setting'; // Settingコンポーネントをインポート

const root = createRoot(document.getElementById('setting'));
root.render(<Setting />);
