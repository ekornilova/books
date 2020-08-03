export const mockGetApiRequest = <T>(requestUrl: string, mockData: T) => {
  return new Promise<T>((resolve /* reject */) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
};

export const mockPostApiRequest = <T>(requestUrl: string, payload: any, mockData: T) => {
  return new Promise<T>((resolve /* reject */) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
};

export const mockUpdateApiRequest = <T>(requestUrl: string, payload: any, mockData: T) => {
  return new Promise<T>((resolve /* reject */) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
};

export const mockDeleteApiRequest = <T>(requestUrl: string, mockData: T) => {
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
