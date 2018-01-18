importScripts('https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.6/Rx.js');

const observable = Rx.Observable;

self.addEventListener('message', (e) => {
    Rx.Observable.from(e.data)
        .groupBy(item => item.name[0])
        .mergeMap(group => group.toArray())
        .reduce((acc, current) => {
            const item = Object.create(null);
            const key = current[0].name[0].toLocaleLowerCase();
            acc[key] = current;

            return acc;
        }, Object.create(null))
        .subscribe(processedData => self.postMessage(processedData));
});
