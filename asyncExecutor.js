// реализация
function asyncExecutor(generator) {
  const iterator = generator();

  function inner(args) {
    const out = iterator.next(args)

    if (out.done) return out.value;

    return Promise.resolve(out.value)
      .then(inner)
      .catch(console.log);
  }
  return inner();
}
// тесты
const ID = 42;
const delayMS = 1000;

function getId() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ID);
    }, delayMS);
  });
}

function getDataById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      id === ID ? resolve('🍎') : reject('💥');
    }, delayMS);
  });
}

asyncExecutor(function* () {
  console.time("Time");

  const id = yield getId();
  const data = yield getDataById(id);
  console.log('Data', data);

  console.timeEnd("Time");
});