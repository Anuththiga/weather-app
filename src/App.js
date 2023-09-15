import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [showData, setShowData] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);

  const handleClick = () => {
    setIsLoading(true);
    axios.get(`https://goweather.herokuapp.com/weather/${city}`)
          .then((response) => {
            setIsLoading(false);
            setWeatherData(response.data);
            setShowData(true);
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
      <div>
        {isLoading && <h1>Data Loading...</h1>}
        {showData && (
          <div>
            <h1>{city}</h1>
            <h3>{weatherData.description}</h3>
            <h1>{weatherData.temperature}</h1>
            <div>
              <div>
                <button> &larr; </button>
              </div>
              <div>
                <div>
                  <h1>Day {weatherData.forecast[0].day}</h1>
                  <h1>{weatherData.forecast[0].temperature}</h1>
                  <h1>{weatherData.forecast[0].wind}</h1>
                </div>
              </div>
              <div>
                <button> &rarr; </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
