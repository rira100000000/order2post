import ReadMinne, { setMinneData } from './minne';
import ReadCreema, { setCreemaData } from './creema';

export const setData = (
  file,
  results,
  setLines,
  setService,
  anotherService,
  serviceData
) => {
  if (file.name.startsWith('orders')) {
    setMinneData(
      results.data,
      setLines,
      setService,
      anotherService,
      serviceData
    );
    return 'minne';
  } else if (file.name.startsWith('tradenavi-list')) {
    setCreemaData(
      results.data,
      setLines,
      setService,
      anotherService,
      serviceData
    );
    return 'Creema';
  } else {
    return 'unknown';
  }
};

export const setDataInModal = async (file, results, setLines, serviceData) => {
  if (file.name.includes('orders')) {
    setLines(serviceData.current.concat(await ReadMinne(results.data)));
    return 'minne';
  } else if (file.name.includes('tradenavi-list')) {
    setLines(serviceData.current.concat(await ReadCreema(results.data)));
    return 'Creema';
  } else {
    return 'unknown';
  }
};
