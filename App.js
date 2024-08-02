import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://your-backend-url.vercel.app/bfhl', JSON.parse(jsonInput));
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOptions([...e.target.selectedOptions].map(option => option.value));
  };

  return (
    <div className="App">
      <h1>JSON Input</h1>
      <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {response && (
        <div>
          <h2>Filter Response</h2>
          <select multiple={true} value={selectedOptions} onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <div>
            <h2>Filtered Response</h2>
            <pre>
              {JSON.stringify({
                alphabets: selectedOptions.includes('alphabets') ? response.alphabets : [],
                numbers: selectedOptions.includes('numbers') ? response.numbers : [],
                highest_alphabet: selectedOptions.includes('highest_alphabet') ? response.highest_alphabet : [],
              }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

