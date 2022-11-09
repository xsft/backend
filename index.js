const express = require('express');
const bodyParser = require('body-parser');
const router = require('./features/router');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', router);
app.use((err, req, res, next) => {
  if (err.statusCode !== undefined) {
    res.status(err.statusCode).send({
      error: err.toString(),
    });
  } else {
    next(err);
  }
});

function response(methodName) {
  return (req, res) => {
    res.send(`Hello from the ${methodName} response`);
  };
}

app.route('/')
  .get(response('GET'))
  .post(response('POST'))
  .put(response('PUT'))
  .delete(response('DELETE'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
