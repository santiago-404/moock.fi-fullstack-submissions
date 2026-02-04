import { useState, useEffect } from "react";
import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_KEY;

const Country = ({countries}) => {  
  const [mainCountry, setMainCoutry] = useState(null);

  useEffect(() => {
    setMainCoutry(null)
  }, [countries])

  const showCountry = (country) => () => setMainCoutry(country)

  if(!countries.length) return;

  if(countries.length > 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  
  if(countries.length > 1){
    return(
      <div>
        <ul>
          {countries.map(country => 
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={showCountry(country)}>show</button>
            </li>
          )}
        </ul>

        <CountryDetails country={mainCountry}/>
      </div>
    )
  }
  
  if(countries.length === 1){
    return (
      <CountryDetails country={countries[0]}/>
    )
  }
}

const CountryDetails = ({country}) => {
  if(country === null) return null

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h1>Languages</h1>
      <ul>
        {Object.values(country.languages).map(
          l => <li key={l}>{l}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />

      <CountryWeather country={country}/>
    </div>
  )
}

const CountryWeather = ({country}) => {
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const fetchWeather = async () => {
      const [lat, lon] = country.capitalInfo.latlng;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

      const response = await axios.get(url);
      
      return setWeather(response.data);
    }
    fetchWeather();
  }, [country])

  if(weather === null){
    return (
      <div>
        Weather details loading....
      </div>
    )
  }
  
  return (
    <div>
      <h1>Weather in {country.capital[0]}</h1>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
    
  )
}

export default Country;