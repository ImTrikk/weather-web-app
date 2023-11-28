import { useState, useEffect } from 'react';

export const Weather = ({ weatherData, onChangeCondition }) => {
 const [weather, setWeather] = useState(weatherData);
 const [weatherCondition, setWeatherCondition] = useState('');

 useEffect(() => {
  setWeather(weatherData);
 }, [weatherData]);

 useEffect(() => {
  onChangeCondition(weather?.weatherResponse?.weather[0]?.main);
  setWeatherCondition(weather?.weatherResponse?.weather[0]?.main);
 }, [weather]);

 const weatherIcon = {
  sunny: '/static/icons/sunny.png',
  clear: '/static/icons/clear.png',
  cloudy: '/static/icons/clouds.png',
  rain: '/static/icons/rain.png',
  snow: '/static/icons/snow.png',
  storm: '/static/icons/storm.png'
 };

 const getWeatherCondition = () => {
  const condition = weatherCondition;
  switch (condition) {
   case 'Sunny':
    return weatherIcon.sunny;
   case 'Rain':
    return weatherIcon.rain;
   case 'Thunder':
    return weatherIcon.thunder;
   case 'Clouds':
    return weatherIcon.cloudy;
   case 'Snow':
    return weatherIcon.snow;
   case 'Clear':
    return weatherIcon.clear;
   case 'Clear Sky':
    return weatherIcon.clear;
   default:
    return weatherIcon.default;
  }
 };

 return (
  <div className="lg:max-mx-4xl">
   <div className="backdrop-blur-lg p-5 rounded text-white">
    <div className="flex items-center">
     <div className="flex items-start w-full justify-between">
      <div className="flex flex-col justify-start">
       <h1 className="text-2xl font-semibold">
        {weather?.weatherResponse?.name},{' '}
        {weather?.weatherResponse?.sys.country}
       </h1>
       <p className="text-xs">
        {new Date(weather?.weatherResponse?.dt * 1000).toLocaleDateString(
         'en-US',
         { month: 'long', day: 'numeric', year: 'numeric' }
        )}
       </p>
       <div className="pt-2">
        <img src={`${getWeatherCondition()}`} alt="" className="w-[150px]" />
        <p className="text-sm font-semibold">
         {weather?.weatherResponse?.weather[0]?.main}
        </p>
       </div>
      </div>
      {/* middle */}
      <div className="flex flex-col">
       <div>
        <h1 className="text-lg font-semibold">Weather Conditions</h1>
        <div className="pt-2 space-y-1">
         <p className="text-xs">
          Wind speed: &nbsp; {weather?.weatherResponse?.wind.speed}
         </p>
         <p className="text-xs">
          Wind gust: &nbsp; {weather?.weatherResponse?.wind.gust}
         </p>
         <p className="text-xs">
          Humidity: &nbsp; {weather?.weatherResponse.main.humidity}%
         </p>
        </div>
       </div>
       <div className="pt-2 ">
        <h1 className="text-lg font-semibold">Other Information</h1>
        <div className="pt-2 space-y-1">
         <p className="text-xs">
          Longitude: &nbsp; {weather?.weatherResponse?.coord.lon}
         </p>
         <p className="text-xs">
          Latitude: &nbsp; {weather?.weatherResponse?.coord.lat}
         </p>
         <p className="text-xs">
          Visibility: &nbsp; {weather?.weatherResponse.visibility} km
         </p>
        </div>
       </div>
      </div>
      {/* here */}
      <div className="flex flex-col items-start justify-start  ">
       <div className="flex items-start justify-start">
        <h1 className="font-medium text-8xl">
         {weather?.weatherResponse?.main?.temp}
        </h1>
        <p className="font-semibd text-5xl">°</p>
       </div>
       <div className=" space-y-1">
        <h1 className="text-lg font-semibold">Temparature</h1>
        <p className="text-xs">
         Feels like: &nbsp; {weather?.weatherResponse?.main.feels_like}°
        </p>
        <p className="text-xs">
         Description: &nbsp; {weather?.weatherResponse?.weather[0]?.description}
        </p>
        <p className="text-xs">
         Min Temp: &nbsp; {weather?.weatherResponse?.main.temp_min}°
        </p>
        <p className="text-xs">
         Max Temp: &nbsp; {weather?.weatherResponse?.main.temp_max}°
        </p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};
