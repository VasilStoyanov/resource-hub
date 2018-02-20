/* globals Worker */

export const createWorkerPromise = (workerURL, data) => new Promise((resolve) => {
  const worker = new Worker(workerURL);

  worker.onmessage = (e) => {
    resolve(e.data);
    worker.terminate();
  };

  worker.postMessage(data);
});
