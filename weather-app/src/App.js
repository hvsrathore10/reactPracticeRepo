import React from 'react'
import Navbar from './components/Navbar'

export default function App() {
  const update = async () => {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ea03cf9805msh3d33a8f3f09aea3p1f20fcjsnc47c41c87672',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <Navbar />
    </div>
  )
}

