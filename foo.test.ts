// import axios from 'axios';

// jest.mock('axios');
// const spyAxiosGet= jest.spyOn(axios, 'get');

// describe('first test', () => {
//   afterEach(() => jest.restoreAllMocks());
//   it('should return empty string', async () => {
//     (axios.get as any).mockResolvedValue('');
//     const data = await get();
//     expect(data).toEqual('');
//   });
// });

import axios, {AxiosError, AxiosInterceptorManager, AxiosResponse} from 'axios';

import * as bar from './bar';
import {BACKEND_AXIOS_INSTANCE} from './customInstance';
import {setInterceptyor} from './foo';

describe('Interceptors', () => {
  describe('initUnauthorizedResponseInterceptor', () => {
    setInterceptyor();

    it('test', () => {
      //   const res = {
      //     response: {status: 401},
      //   };

      const axiosError = new AxiosError(
        'error',
        '',
        {},
        {},
        {
          status: 401,
          statusText: 'Unauthorized',
          data: {},
          headers: {},
          config: {},
        },
      );

      const spy = jest.spyOn(bar, 'bar');
      //   console.log();

      interface handlerType {
        fulfilled: (value: any) => void;
        rejected: (value: any) => void;
        synchronous: boolean;
        runWhen: null;
      }

      interface responseType extends AxiosInterceptorManager<AxiosResponse<any, any>> {
        handlers: handlerType[];
      }

      const response = BACKEND_AXIOS_INSTANCE.interceptors.response as responseType;

      //   const handlers = response.handlers as handlerType[];

      //   console.log(response);

      const rejectedRes = response.handlers[0].rejected(axiosError);
      //   console.log(BACKEND_AXIOS_INSTANCE.interceptors.response);

      //   const rejectedRes = BACKEND_AXIOS_INSTANCE.interceptors.response.handler[0].rejected(axiosError);

      expect(spy).toHaveBeenCalled();
      expect(rejectedRes).toBeUndefined();
    });
  });
});
