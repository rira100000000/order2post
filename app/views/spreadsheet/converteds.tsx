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
      let message = '';
      for (const convertedId of response.data) {
        if (message !== '') {
          message = message + '\n' + convertedId.split('\n').join('');
        } else {
          message =
            '以下の注文は既に変換したことがあります。ご注意ください。\n' +
            convertedId.split('\n').join('');
        }
      }
      if (message !== '') {
        alert(message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default updateConverteds;
