import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ weather }) => {
  return (
    <div>
      <p>temperature {weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} />
      <p>speed {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
    </div>)
}
const CountryData = ({ country, languages }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>region {country.region}</p>
      <h3>languages</h3>
      <ul>
        {Object.keys(languages).map((key, index) => <li key={key + index}>{languages[key]}</li>)}
      </ul>
      <img src={country.flags.png}></img>
    </div>)
}
const Countries = ({ countries, showCountryDetails, weather }) => {

  //By default return a list of countries
  let response = (
    <ul>
      {countries.map((country, i) =>
        <li key={country.cca2 + country.ccn3 + i}>
          {country.name.common}
          <button id={country.name.common} onClick={showCountryDetails} >show</button>
        </li>
      )}
    </ul>)

  //Return text for too many countries
  if (countries.length > 10)
    response = <div>too many countries, narrow down the search</div>
    
  //Return details
  else if (countries.length == 1) {
    let country = countries[0]
    let languages = country.languages
    response = [
      <div>
        <CountryData country={country} languages={languages} />
      </div>]

    //Add weather to details if possible
    if (weather.current) {
      response.push(
        <div>
          <h3>weather in {country.capital[0]}</h3>
          <Weather weather={weather} />
        </div>
      )
    }
  }

  else if (countries.length == 0)
    response = <div>no results</div>

  return response

}

const Search = ({ search, onChange }) => {
  return (<form onSubmit={(event) => event.preventDefault()}>
    <div>
      search:
      <input value={search} onChange={onChange} />
    </div>
  </form>)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setNewSearch] = useState('')
  const [weather, setNewWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setNewWeather({})
  }

  const countriesToShow = search === '' ?
    countries :
    countries.filter(country => country
      .name
      .common
      .toLowerCase()
      .includes(search.toLowerCase())
    )

  //Get weather details ONCE if only one country is shown
  if (countriesToShow.length === 1 && !weather.current) {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countriesToShow[0].capital[0]}`)
      .then(response => {
        setNewWeather(response.data)
      })
  }

  //Callback for the "show" buttons
  const showCountryDetails = (event) => setNewSearch(event.target.id)

  return (
    <div>
      <h2>Country search</h2>
      <Search search={search} onChange={handleSearchChange} />
      <Countries countries={countriesToShow} showCountryDetails={showCountryDetails} weather={weather} />
    </div>
  )
}

export default App