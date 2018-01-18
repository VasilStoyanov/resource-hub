export const createWorkerPromise = (workerURL, data) => new Promise((resolve, reject) => {
    const worker = new Worker(workerURL);
    
    worker.onmessage = function (e) {
        resolve(e.data);
    };

    worker.postMessage(data);
});
