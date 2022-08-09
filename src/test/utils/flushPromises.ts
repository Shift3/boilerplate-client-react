export const flushPromises = async (): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, 10);
  });
