import axios from 'axios';

const updateConverteds = (lines) => {
  let converteds: string[] = [];
  for (const line of lines) {
    if (line['checked'] === true) {
      converteds.push(line['order'][0] as string);
    }
  }

  axios
    .post('/converteds', { converteds: converteds })
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
};

const alertConverteds = async (lines) => {
  const converteds = await checkConverteds(lines);

  let message = '';
  for (const converted of converteds) {
    if (message !== '') {
      message = message + '\n' + converted.split('\n').join('');
    } else {
      message =
        '以下の注文は既に変換したことがあります。ご注意ください。\n' +
        converted.split('\n').join('');
    }
  }

  if (message !== '') {
    alert(message);
  }
};

const checkConverteds = (lines): Promise<string[]> => {
  return axios
    .get('/converteds')
    .then((response) => {
      const newOrderIds: string[] = [];
      for (const line of lines) {
        if (line['checked'] === true) {
          newOrderIds.push(line['order'][0]);
        }
      }

      const converteds: string[] = [];
      for (const convertedOrder of response.data) {
        for (const newOrderId of newOrderIds) {
          if (newOrderId === convertedOrder['order_id'].replace(/\\n/g, '\n')) {
            converteds.push(newOrderId);
          }
        }
      }

      return converteds;
    })
    .catch((error) => {
      console.error('データの取得に失敗しました: ', error);
      return [];
    });
};

export { updateConverteds, alertConverteds, checkConverteds };
