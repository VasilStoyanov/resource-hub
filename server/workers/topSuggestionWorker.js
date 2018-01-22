// importScripts('https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.6/Rx.js');
//
// const observable = Rx.Observable;
//
// self.addEventListener('message', (e) => {
//     const topCount = e.data.topCount;
//     const userInput = e.data.userInput;
//     const data = e.data.data;
//
//     Rx.Observable.from(data)
//         .filter(item =>
//             item.name.toLocaleLowerCase().indexOf(userInput.toLocaleLowerCase()) !== -1)
//         .take(topCount)
//         .reduce((acc, current) => {
//             acc.push(current);
//             return acc;
//         }, [])
//         .subscribe(processedData => self.postMessage(processedData));
// });
