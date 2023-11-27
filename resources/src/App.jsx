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
  cloudy: '/static/cloudy.gif'
 };

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
  console.log(location);

  fetch(`http://127.0.0.1:8000/api/get-forecast/${location}`, {
   method: 'GET',
   headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
   }
  }).then(async (res) => {
   console.log(res);
   if (res.ok) {
    return res.json().then((data) => {
     console.log(data);
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
  console.log('Condition in get background: ', condition);
  switch (condition) {
   case 'sunny':
    return bg.sunny;
   case 'rainy':
    return bg.rainy;
   case 'thunder':
    return bg.thunder;
   case 'Clouds':
    return bg.cloudy;
   default:
    return bg.sunny; // Default to sunny if condition is not recognized
  }
 };

 return (
  <>
   <div
    className=" text-white h-screen flex items-center justify-center "
    style={{
     backgroundImage: `url(${getBackgroundImage()})`,
     backgroundSize: 'cover',
     backgroundPosition: 'top-right'
    }}
   >
    <div className="mx-5 lg:mx-32 lg:max-mx-4xl rounded p-10">
     <div className="text-center">
      <h1 className="text-2xl font-bold">Weather Now</h1>
     </div>
     <div className="flex items-center justify-center mt-10  backdrop-blur-lg p-10 rounded-xl">
      <form action="" className="w-full md:w-[500px]">
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
