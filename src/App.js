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

  const decrementDay = () => {
    if(currentDay == 0) setCurrentDay(2);
    else setCurrentDay(currentDay - 1);
  }

  const incrementDay = () => {
    if(currentDay == 2) setCurrentDay(0);
    else setCurrentDay(currentDay + 1)
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
                <button onClick={decrementDay}> &larr; </button>
              </div>
              <div>
                <div>
                  <h1>Day {weatherData.forecast[currentDay].day}</h1>
                  <h1>{weatherData.forecast[currentDay].temperature}</h1>
                  <h1>{weatherData.forecast[currentDay].wind}</h1>
                </div>
              </div>
              <div>
                <button onClick={incrementDay}> &rarr; </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
