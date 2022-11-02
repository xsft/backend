const express = require('express');

const app = express();
const port = 3000;

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
