import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import SpreadSheet from '../../../app/views/spreadsheet/SpreadSheet';

it('クリックポスト変換ボタンが表示されること', () => {
  render(<SpreadSheet />);
  const linkElement = screen.getByText(/ファイルを選択/i);

  expect(linkElement).toBeInTheDocument();
});
