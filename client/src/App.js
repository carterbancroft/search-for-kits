import React, {useState, useEffect} from 'react'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import KitDetail from './KitDetail';

import './App.css';

function App() {
  const [kitSearchData, setKitSearchData] = useState([]);
  const [kitData, setKitData] = useState();
  const [kitId, setKitId] = useState();
  const [autocompleteValue, setAutocompleteValue] = useState();

  const apiUrl = 'http://localhost:8888'

  const fetchKitSearchData = async () => {
    const endpoint = `${apiUrl}/search?q=${autocompleteValue}`
    const response = await fetch(endpoint);
    const data = await response.json();
    setKitSearchData(data);
  }

  const fetchKitData = async () => {
    const endpoint = `${apiUrl}/kit?id=${kitId}`
    const response = await fetch(endpoint);
    const data = await response.json();
    setKitData(data);
  }

  useEffect(() => {
    if (!autocompleteValue) return;

    fetchKitSearchData().catch(console.error);
  }, [autocompleteValue]);

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
