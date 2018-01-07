(function (homeFactory) {
  "use strict";

  const { Observable } = Rx;
  const updateHTML = (id) => (value) => document.getElementById(id).innerHTML += value;

  const getUsers$ = Observable.fromEvent(
      document.getElementById("get-users-btn"),
      "click"
    )
    .switchMap(_ => homeFactory.getData())
    .subscribe(updateHTML("users-container"));

})(homeFactory);