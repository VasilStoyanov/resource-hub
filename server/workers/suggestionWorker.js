importScripts('https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.6/Rx.js');

const observable = Rx.Observable;

const sortAlphabetic = (arr) => arr.sort((elOne, elTwo) => {
    if (elOne.name < elTwo.name) return -1;
    if (elOne.name > elTwo.name) return 1;
    return 0;
}); 

self.addEventListener('message', (e) => {
    Rx.Observable.from(e.data)
        .groupBy(item => item.name[0])
        .mergeMap(group => group.toArray())
        .map(sortAlphabetic)
        .reduce((acc, current) => {
            const item = Object.create(null);
            const key = current[0].name[0].toLocaleLowerCase();
            acc[key] = current;

            return acc;
        }, Object.create(null))
        .subscribe(processedData => self.postMessage(processedData));
});
