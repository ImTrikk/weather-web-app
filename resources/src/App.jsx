import { useState } from 'react';
import './App.css';
import { Weather } from './components/Weather';
function App() {
  const [newLocation, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [responseGood, setResponseGood] = useState(false);

  const handelGetWeatherData = async (e) => {
    const location = newLocation.toLowerCase().replace(' city', '');
    console.log(location);

    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/get-weather/${location}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(async (res) => {
      return res.json().then((data) => {
        console.log(data);
        if (res.ok) {
          setWeatherData(data);
          setResponseGood(true);
        } else {
          console.log(data);
        }
      });
    });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white h-screen">
        <div>
            
        </div>
        <div className='flex items-center justify-center'>
          <form action="">
            <input
              type="text"
              value={newLocation}
              placeholder="Enter city"
              onChange={(e) => setLocation(e.target.value)}
              className="text-gray-500"
            />
            <button onClick={handelGetWeatherData}>search</button>
          </form>
        </div>
        {responseGood ? <Weather weatherData={weatherData} /> : ""  }
        {responseGood ? <Weather weatherData={weatherData} /> : ""  }
      </div>
    </>
  );
}

export default App;
