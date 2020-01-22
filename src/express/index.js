function express() {
  const middlewares = [];
  const app = function () {
    let i = 0;
    function next() {
      let task = middlewares[i++];
      if (!task) {
        return;
      }
      task(next);
    }
    next();
  }

  app.use = function (task) {
    middlewares.push(task);
  }

  return app;
}

// ======= test =======

const app = express();
app.use(next => {
  console.log(1)
  next();
  console.log(6)
});
app.use(next => {
  console.log(2)
  next();
  console.log(5)
});
app.use(next => {
  console.log(3)
  next();
  console.log(4)
});
app();
