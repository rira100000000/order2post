import React, { useEffect, useRef } from 'react';
import '../../assets/stylesheets/print.css';

interface PrintProps {
  lines: Array<Array<string | boolean>>;
}

export default function PrintSheet(props: PrintProps) {
  const addBr = (msg: string) => {
    const texts = msg.split(/(\n)/).map((item, index) => {
      return (
        <React.Fragment key={index}>
          {item.match(/\n/) ? <br /> : item}
        </React.Fragment>
      );
    });
    return texts;
  };

  const headerClass = (index: number): string => {
    switch (index % 7) {
      case 0:
        return 'orderNum';
      case 1:
        return 'shipping';
      case 2:
        return 'item';
      case 3:
        return 'itemNum';
      case 4:
        return 'address';
      case 5:
        return 'date';
      case 6:
        return 'remarks';
      default:
        return 'unknown';
    }
  };

  const setPrintStyles = () => {
    const spreadsheets = document.querySelectorAll('.printSheet');
    for (const spreadsheet of spreadsheets) {
      const rows = spreadsheet.querySelectorAll('tr');
      rows.forEach((row, index) => {
        row.classList.add('print-friendly');

        const cells = row.querySelectorAll('td');
        cells.forEach((cell) => {
          if (index % 2 === 0) {
            cell.classList.add('even-row');
          }
        });
      });
    }
  };
  const outputToPrintSheet = () => {
    const outputRows = props.lines.map((line, index) => (
      <tr key={index}>
        {line.slice(1).map((item, dataIndex) => (
          <td key={dataIndex} className={headerClass(dataIndex)}>
            {addBr(item as string)}
          </td>
        ))}
      </tr>
    ));

    return (
      <table className='printSheet' style={{ display: 'none' }}>
        <thead>
          <tr className='print-friendly'>
            <th>注文番号</th>
            <th>発送方法</th>
            <th>商品名</th>
            <th>数量</th>
            <th>発送先</th>
            <th>注文日</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>{outputRows}</tbody>
      </table>
    );
  };

  useEffect(() => {
    setPrintStyles();
  }, [props.lines]);

  return <>{outputToPrintSheet()}</>;
}
