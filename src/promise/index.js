class MyPromise {
  constructor(resolveCallback) {
    this.callbacks = [];
    this.state = 'pending';
    this.value = null;
    resolveCallback(this._resolve.bind(this));
  }

  then(onFulfilled) {
    return new MyPromise(resolve => {
      this._handle({
        onFulfilled: onFulfilled || null,
        resolve,
      });
    });
  }

  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback);
      return;
    }

    if (!callback.onFulfilled) {
      callback.resolve(this.value);
      return;
    }

    const ret = callback.onFulfilled(this.value);
    callback.resolve(ret);
  }

  _resolve(value) {
    this.state = 'fulfilled';
    this.value = value;
    this.callbacks.forEach(fn => this._handle(fn));
  }
}

// ================== test ===================

const promise = new MyPromise(resolve => {
  setTimeout(function () {
    console.log('ok');
    resolve(Math.random());
  }, 1000);
}).then(value => {
  console.log('then 1 ', value);
  return Math.random();
}).then(value => {
  console.log('then 2 ', value);
});
