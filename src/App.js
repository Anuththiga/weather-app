import { useState } from 'react';
import './App.css';
import axios from 'axios';
import SunIcon from "./Images/sun.png";
import ColdIcon from "./Images/cold.png";

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [citySearched, setCitySearched] = useState("");
  const [showData, setShowData] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [icon, setIcon] = useState("");

  const handleClick = () => {
    setIsLoading(true);
    axios.get(`https://goweather.herokuapp.com/weather/${city}`)
          .then((response) => {
            setCitySearched(city);
            setIsLoading(false);
            setWeatherData(response.data);
            determineIcon(response.data);
            setShowData(true);
          })
  }

  const decrementDay = () => {
    if(currentDay === 0) setCurrentDay(2);
    else setCurrentDay(currentDay - 1);
  }

  const incrementDay = () => {
    if(currentDay === 2) setCurrentDay(0);
    else setCurrentDay(currentDay + 1)
  }

  const determineIcon = (data) => {
    if (Number(data.temperature.substr(1, 3)) > 15) {
      setIcon(SunIcon);
    } else {
      setIcon(ColdIcon);
    }
  };

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
      <div className='data-container'>
        {isLoading && <h1>Data Loading...</h1>}
        {showData && (
          <div className='data-card'>
            <h1 className='data-city'>{citySearched}</h1>
            <img className="data-icon" src={icon} alt='icon' />
            <h3 className='data-weather'>{weatherData.description}</h3>
            <h1 className='data-temperature'>{weatherData.temperature}</h1>
            <div className='forecast-container'>
              <div className='left'>
                <button onClick={decrementDay}> &larr; </button>
              </div>
              <div className='middle'>
                <div className='forecast-data'>
                  <h1>Day {weatherData.forecast[currentDay].day}</h1>
                  <h1>{weatherData.forecast[currentDay].temperature}</h1>
                  <h1>{weatherData.forecast[currentDay].wind}</h1>
                </div>
              </div>
              <div className='right'>
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
