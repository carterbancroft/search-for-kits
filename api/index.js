const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8888;

app.use(cors());

let dataJson = [];
try {
  const data = fs.readFileSync('./KITS_SHIPPING_DATA.json', 'utf8');
  dataJson = JSON.parse(data);
}
catch (err) {
  console.error(err);
}

app.get('/search', (req, res) => {
  if (!req.query?.q) {
    return res.json([]);
  }

  const searchString = req.query.q;

  const filteredData = dataJson.filter((d) => d.label_id.includes(searchString));
  const responseObj = filteredData.map((d) => ({ label: d.label_id, id: d.id }));

  return res.json(responseObj);
});

app.get('/kit', (req, res) => {
  const parsedId = parseInt(req.query?.id, 10);
  if (!parsedId) {
    return res.json({});
  }

  const kit = dataJson.find((d) => d.id === parsedId);

  return res.json(kit);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
