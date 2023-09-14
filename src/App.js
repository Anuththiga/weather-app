import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    axios.get(`https://goweather.herokuapp.com/weather/${city}`)
          .then((response) => {
            console.log(response)
          })
  }

  return (
    <div className="App">
      <div className='input-container'>
        <input 
          className='inputs'
          type='text' 
          placeholder='Enter a City' 
          onChange={(e) => setCity(e.target.value)}
          />
        <button onClick={handleClick}>Get Weather</button>
      </div>
    </div>
  );
}

export default App;
