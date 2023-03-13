const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8888;

// TODO: This is just opening things up to all cross origin requests. It should
// probably at least specify origins based on the current env.
app.use(cors());

// TODO: In a prod ready app, this data would be in a real database and there
// would be lib code for managing database interaction. Just loading a JSON
// file into memory on startup is obviously not a sustainable solution for a
// real app.
let dataJson = [];
try {
  const data = fs.readFileSync('./KITS_SHIPPING_DATA.json', 'utf8');
  dataJson = JSON.parse(data);
}
catch (err) {
  // TODO: Error handling would ideally report to a product like Rollbar/Sentry.
  console.error(err);
}

app.get('/search', (req, res) => {
  if (!req.query?.q) {
    return res.json([]);
  }

  const searchString = req.query.q;

  // TODO: I'm trusting user input, which ain't great. If this were real and DB
  // backed it should have validation so we don't fall prey to injection.
  const filteredData = dataJson.filter((d) => d.label_id.includes(searchString));

  // TODO: This formats the response object to match what the Autocomplete
  // requires on the FE. This might be the tail wagging the dog a bit, perhaps
  // the FE should handle massaging the data so it fits into the Autocomplete's
  // paradigm and the BE could just return the data as it comes from the DB.
  const responseObj = filteredData.map((d) => ({ label: d.label_id, id: d.id }));

  return res.json(responseObj);
});

app.get('/kit', (req, res) => {
  const parsedId = parseInt(req.query?.id, 10);
  if (!parsedId) {
    return res.json({});
  }

  // TODO: Again, this would be validated in a real DB backed app.
  const kit = dataJson.find((d) => d.id === parsedId);

  return res.json(kit);
});

// TODO: In a prod ready app the server logic would be abstracted out some so
// the endpoint definitions are mashed up with it. It was just quick and dirty
// to put it all in the same file.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
