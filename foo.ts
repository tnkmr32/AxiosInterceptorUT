import axios, {AxiosResponse} from 'axios';

import {bar} from './bar';
import {setAxiosResponseInterceptor} from './customInstance';

export const setInterceptyor = () => {
  const onFulfilled = (response: AxiosResponse) => response;
  const onRejected = (error: any) => {
    console.log('in onRejected');
    console.log(error);

    /* 401 Unauthorized */
    if (axios.isAxiosError(error)) {
      console.log('isAxiosError');

      if (error.response?.status === 401) {
        bar();
      }
    }
  };

  setAxiosResponseInterceptor(onFulfilled, onRejected);
};
