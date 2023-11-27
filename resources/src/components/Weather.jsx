import { useState, useEffect } from 'react';

export const Weather = ({ weatherData, onChangeCondition }) => {
 const [weather, setWeather] = useState(weatherData);
 const [weatherCondition, setWeatherCondition] = useState('');

 useEffect(() => {
  setWeather(weatherData);
 }, [weatherData]);

 const getIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
 };

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
    <div className="flex items-center gap-10">
     {/* <div>
      <img src="/static/cloudy.png" alt="" className='w-[250px]'/>
     </div> */}
     <div>
      <div className="flex flex-col">
       <div className="flex items-start">
        <h1 className="font-semibold text-5xl">
         {weather?.weatherResponse?.main?.temp}
        </h1>
        <p className="font-semibold text-xl">°</p>
       </div>
       <h1 className="text-xs">
        {weather?.weatherResponse?.name},{' '}
        {weather?.weatherResponse?.sys.country}
       </h1>
       <div>
        <img src={`${getWeatherCondition()}`} alt="" className="w-[100px]" />
       </div>
      </div>
      {/* <div>
       <p className="text-xs">
        Feels like: {weather?.weatherResponse?.main.feels_like}°
       </p>
       <p className="text-xs">
        Condition: {weather?.weatherResponse?.weather[0]?.main}
       </p>
       <p className="text-xs">
        Description: {weather?.weatherResponse?.weather[0]?.description}
       </p>
       {/* Render the weather icon using an <img> element */}
      {/* {weather?.weatherResponse?.weather[0]?.icon && (
        <img
         src={getIconUrl(weather?.weatherResponse?.weather[0]?.icon)}
         alt="Weather Icon"
        />
       )} */}
      {/* </div> */}
      <div>
       <p className="text-xs">
        Humidity: {weather?.weatherResponse.main.humidity}%
       </p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};
