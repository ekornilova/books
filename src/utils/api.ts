const PROPABILITY_VALUE = 0.95;
export const getPromise = <T>(mockData: T): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      const randomValue = Math.random();
      if (randomValue < PROPABILITY_VALUE) {
        resolve(mockData);
      } else {
        const error = new Error('error in server');
        reject(error);
      }
    }, 500);
  });
};
export const mockGetApiRequest = <T>(requestUrl: string, mockData: T): Promise<T> => {
  return getPromise(mockData);
  // new Promise<T>((resolve /* reject */) => {
  //   setTimeout(() => {
  //     resolve(mockData);
  //   }, 500);
  // });
};

export const mockPostApiRequest = <T>(
  requestUrl: string,
  payload: any,
  mockData: T,
): Promise<T> => {
  return new Promise<T>((resolve /* reject */) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
};

export const mockUpdateApiRequest = <T>(
  requestUrl: string,
  payload: any,
  mockData: T,
): Promise<T> => {
  return new Promise<T>((resolve /* reject */) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
};

export const mockDeleteApiRequest = <T>(requestUrl: string, mockData: T): Promise<T> => {
  return new Promise<T>((resolve /* reject */) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
};
export const doRequest = async <T>(promise: Promise<T>) => {
  try {
    return await promise;
  } catch (e) {
    return 'error';
  }
};
