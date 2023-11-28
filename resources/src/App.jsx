import { useState } from 'react';
import './App.css';
import { Weather } from './components/Weather';
import { BsSearch } from 'react-icons/bs';
import { Forecast } from './components/Forecast';

function App() {
 const [newLocation, setLocation] = useState('');
 const [weatherData, setWeatherData] = useState([]);
 const [forecastData, setForecastData] = useState([]);
 const [responseGood, setResponseGood] = useState(false);

 const [background, setBackground] = useState('');

 const bg = {
  default: '/static/default.jpg',
  sunny: '/static/sunny.gif',
  rainy: '/static/rainy.gif',
  thunder: '/static/thunder.gif',
  cloudy: '/static/cloudy.gif',
  snow: '/static/snow.gif',
  clear: '/static/clear.gif'
 };

 const handelGetWeatherData = async (e) => {
  const location = newLocation.toLowerCase().replace(' city', '');

  e.preventDefault();
  fetch(`http://127.0.0.1:8000/api/get-weather/${location}`, {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
   }
  }).then(async (res) => {
   return res.json().then((data) => {
    if (res.ok) {
     handleGetForecast();
     setWeatherData(data);
     setResponseGood(true);
    } else {
     console.log(data);
    }
   });
  });
 };

 const handleGetForecast = async () => {
  const location = newLocation.toLowerCase().replace(' city', '');

  fetch(`http://127.0.0.1:8000/api/get-forecast/${location}`, {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
   }
  }).then(async (res) => {
   if (res.ok) {
    return res.json().then((data) => {
     setForecastData(data);
    });
   } else {
    console.log('Internal server error');
   }
  });
 };

 const onChangeCondition = (value) => {
  console.log(value);
  setBackground(value);
 };

 const getBackgroundImage = () => {
  const condition = background;
  switch (condition) {
   case 'Sunny':
    return bg.sunny;
   case 'Rain':
    return bg.rainy;
   case 'Thunder':
    return bg.thunder;
   case 'Clouds':
    return bg.cloudy;
   case 'Snow':
    return bg.snow;
   case 'Clear':
    return bg.clear;
   default:
    return bg.default;
  }
 };

 return (
  <>
   <div
    className=" text-white h-screen overflow-hidden flex items-center justify-center"
    style={{
     backgroundImage: `url(${getBackgroundImage()})`,
     //  backgroundSize: 'cover',
     backgroundSize: '100% 100%',
     backgroundPosition: 'top-right',
     backgroundRepeat: 'no-repeat'
    }}
   >
    <div className="mx-5 lg:mx-32 lg:max-mx-4xl rounded p-10 ">
     <div className="flex items-center justify-center">
      <div className="w-[600px] text-center">
       <h1 className="text-3xl font-bold">Weather Now</h1>
       <p className="text-xs pt-2">
        A straightforward weather app designed to provide you with real-time
        weather updates at your fingertips. Stay informed about current weather
        conditions, temperature, and forecasts for any city. Enjoy a clean and
        intuitive interface, making it easy to check the weather with just a
        glance.
       </p>
      </div>
     </div>
     <div className="flex items-center justify-center mt-10  backdrop-blur-lg p-5 rounded">
      <form action="" className="w-full">
       <div className="flex items-center gap-2 w-full">
        <input
         type="text"
         value={newLocation}
         placeholder="Enter city"
         onChange={(e) => setLocation(e.target.value)}
         className="w-full text-gray-500 h-10 rounded outline-none text-xs px-4"
        />
        <div
         onClick={handelGetWeatherData}
         className="text-xs cursor-pointer h-10 w-10 flex items-center justify-center bg-white text-gray-500  rounded px-2"
        >
         <BsSearch size={16} />
        </div>
       </div>
      </form>
     </div>
     <div className="pt-5">
      {responseGood ? (
       <div>
        <div>
         <Weather
          weatherData={weatherData}
          onChangeCondition={(value) => onChangeCondition(value)}
         />
        </div>
        <div className="pt-5">
         <Forecast forecastData={forecastData} />
        </div>
       </div>
      ) : (
       ''
      )}
     </div>
    </div>
   </div>
  </>
 );
}

export default App;
