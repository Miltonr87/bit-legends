import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

export const useDisplayDevice = () => {
  const [device, setDevice] = useState('Unknown Device');

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    const os = result.os.name || '';
    const osVersion = result.os.version ? ` ${result.os.version}` : '';
    const model = result.device.model || '';
    const vendor = result.device.vendor || '';
    const name = `${vendor} ${model}`.trim() || os + osVersion;
    setDevice(name || 'Unknown Device');
  }, []);

  return device;
};
