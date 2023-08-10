import React, {useEffect, useState} from 'react';
import * as Storage from '@src/service';

const loginUserHooks = () => {
  const [loginId, setLoginId] = useState<string | undefined>('');

  useEffect(() => {
    Storage.retrieveData('USER_ID').then(id => {
      if (id) {
        setLoginId(id);
      }
    });
  }, []);

  return [loginId, setLoginId];
};

export default loginUserHooks;
