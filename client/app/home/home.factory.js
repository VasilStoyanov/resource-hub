const homeFactory = (function () {
  "use strict";

  const { Observable } = Rx;

  const getData = () =>
    Observable.fromPromise(axios("api/home"))
    .pluck("data")
    .switchMap(data => Observable.from(data))
    .map(user => JSON.stringify(user))
    .catch(error => Observable.of(`Error: ${error}`));

  return {
    getData
  };
})();