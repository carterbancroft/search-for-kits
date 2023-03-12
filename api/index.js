const fs = require('fs');
const express = require('express');

const app = express();
const port = 8888;

app.get('/search', (req, res) => {
  let dataJson = [];
  try {
    const data = fs.readFileSync('./KITS_SHIPPING_DATA.json', 'utf8');
    dataJson = JSON.parse(data);
  }
  catch (err) {
    console.error(err);
  }
  res.json(dataJson);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
