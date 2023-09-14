import axios from 'axios';

const updateConverteds = (lines) => {
  let converteds: string[] = [];
  for (const line of lines) {
    if (line[0] === true) {
      converteds.push(line[1] as string);
    }
  }

  axios
    .post('/converteds', { converteds: converteds })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const alertConverteds = async (lines) => {
  const converteds = await checkConverteds(lines);

  let message = '';
  for (const converted of converteds) {
    console.log(converted);
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
        if (line[0] === true) {
          newOrderIds.push(line[1] as string);
        }
      }

      const converteds: string[] = [];
      for (const convertedOrder of response.data) {
        for (const newOrderId of newOrderIds) {
          if (newOrderId === convertedOrder['order_id']) {
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
