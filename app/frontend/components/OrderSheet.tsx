import React from 'react';
import type { Line } from '../types.d.ts';

interface OrderSheetProps {
  lines: Array<Line>;
  setLines: React.Dispatch<React.SetStateAction<Array<Line>>>;
}

function OrderSheet(props: OrderSheetProps) {
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
  const keyName = (index: number): string => {
    switch (index) {
      case 0:
        return 'orderNum';
      case 1:
        return 'shipping';
      case 2:
        return 'item ';
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

  const classes = (index: number, oddOrEven: string): string => {
    switch (index) {
      case 0:
        return `min-120 ${oddOrEven} ${keyName(index)}`;
      case 1:
        return `min-120 ${oddOrEven} ${keyName(index)}`;
      case 2:
        return `min-300 ${oddOrEven} ${keyName(index)}`;
      case 3:
        return `min-10 ${oddOrEven} ${keyName(index)}`;
      case 4:
        return `min-300 ${oddOrEven} ${keyName(index)}`;
      case 5:
        return `min-100 ${oddOrEven} ${keyName(index)}`;
      case 6:
        return `min-300 ${oddOrEven} ${keyName(index)}`;
      default:
        return 'unknown';
    }
  };

  const outputToOrderSheet = () => {
    const handleOnChange = (index) => {
      const copyLines = [...props.lines];
      copyLines[index]['checked'] = !copyLines[index]['checked'];
      props.setLines(copyLines);
    };

    const handleOnClick = (index) => {
      const checkbox = document.getElementById(`checkbox-${index}`);
      if (checkbox) {
        checkbox.click();
      }
    };

    const outputRows = props.lines.map((line, index) => {
      let oddOrEven = '';
      if (index % 2 === 0) {
        oddOrEven = 'even-row';
      } else {
        oddOrEven = 'odd-row';
      }
      return (
        <tr key={line['order'][0].toString()} className='print-friendly'>
          <td
            className={`min-120 ${oddOrEven} checkbox-cell print_none`}
            onClick={() => {
              handleOnClick(index);
            }}
          >
            <div className='flex justify-center items-center'>
              <input
                type='checkbox'
                id={`checkbox-${index}`}
                className='self-start'
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={() => handleOnChange(index)}
                checked={line['checked'] ? true : false}
              />
            </div>
          </td>
          {line['order'].map((item, dataIndex) => (
            <td
              key={line['order'][0] + keyName(dataIndex)}
              className={classes(dataIndex, oddOrEven)}
            >
              {addBr(item)}
            </td>
          ))}
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th className='print_none'>変換対象選択</th>
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

  return <>{outputToOrderSheet()}</>;
}

export default OrderSheet;
