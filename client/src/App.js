import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import './App.css';

function App() {
  return (
    <div className="App">
      <Autocomplete
        disablePortal
        id="kit-autocomplete-search"
        // options={}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Kit ID" />}
      />
    </div>
  );
}

export default App;
