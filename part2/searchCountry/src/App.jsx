import { useEffect, useState } from "react";
import axios from 'axios';
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
      setCountries(response.data);
    }

    fetchCountries();
  }, [])

  const handleFilter = event => setFilter(event.target.value);


  const countryList = filter === '' 
  ? [] // Show nothing if the input is empty
  : countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div>
      find countries
      <input type="text" value={filter} onChange={handleFilter}/>
      <Country countries={countryList}/>
    </div>
  )
}


export default App;