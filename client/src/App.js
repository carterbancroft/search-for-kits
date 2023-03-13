import {useState, useEffect} from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import KitDetail from './KitDetail';

import './App.css';

function App() {
  // kitSearchData contains the current search results based on user input,
  // formatted to work with the Autocomplete component.
  const [kitSearchData, setKitSearchData] = useState([]);

  // kitData contains the detailed information for a selected kit, as returned
  // from the API.
  const [kitData, setKitData] = useState();

  // Tracks the ID for the currently selected kit. Used for making requests
  // for specific kitData.
  const [kitId, setKitId] = useState();

  // Tracks the current Autocomplete input. Used for making kit search requests.
  const [autocompleteValue, setAutocompleteValue] = useState();

  // TODO: This is a bit of a code smell. It should be refactored such that the
  // component itself doesn't need to know URL details and that the URL is env
  // based.
  const apiUrl = 'http://localhost:8888'

  const fetchKitSearchData = async () => {
    const endpoint = `${apiUrl}/search?q=${autocompleteValue}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    setKitSearchData(data);
  }

  const fetchKitData = async () => {
    const endpoint = `${apiUrl}/kit?id=${kitId}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    setKitData(data);
  }

  // Whenever the autocomplete text value changes it should make a new search
  // request to the API.
  //
  // TODO: This should be debounced.
  useEffect(() => {
    if (!autocompleteValue) return;

    // TODO: In a prod ready application, error reporting would be more robust
    // than just logging to the console. Depending on context it should either
    // show something to the user, send an error to something like
    // Rollbar/Sentry or both.
    fetchKitSearchData().catch(console.error);
  }, [autocompleteValue]);

  // Whenever a Kit ID is selected, it should make a request to the backend to
  // get kit details.
  useEffect(() => {
    if (!kitId) return;

    fetchKitData().catch(console.error);
  }, [kitId])

  return (
    <div className="App">
      <p className="title">Biobot Kit Search</p>

      <Autocomplete
        disablePortal
        id="kit-autocomplete-search"
        options={kitSearchData}
        filterOptions={(x) => x}
        onChange={(_, value) => setKitId(value.id)}
        onInputChange={(_, value) => setAutocompleteValue(value)}
        renderInput={(params) => <TextField {...params} label="Kit ID" />}
        className="autocomplete-field"
      />

      { kitData &&
        <KitDetail
          kitId={kitData.label_id}
          tracking={kitData.shipping_tracking_code}
        />
      }
    </div>
  );
}

export default App;
