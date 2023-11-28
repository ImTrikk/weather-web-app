import React, { useState, useEffect } from 'react';

export const Forecast = ({ forecastData }) => {
 const [forecast, setForecast] = useState([]);

 useEffect(() => {
  if (forecastData && forecastData.forecastResponse) {
   setForecast(forecastData.forecastResponse.list);
  }
 }, [forecastData]);

 // Use slice(0, 5) to get only the first 5 elements
 const firstFiveForecast = forecast.slice(0, 5);

 const weatherIcon = {
  Sunny: '/static/icons/sunny.png',
  Rain: '/static/icons/rain.png',
  Thunder: '/static/icons/thunder.png',
  Clouds: '/static/icons/clouds.png',
  Snow: '/static/icons/snow.png',
  Clear: '/static/icons/clear.png',
  Haze: '/static/icons/haze.png',
  default: '/static/icons/default.png'
 };

 return (
  <div>
   <h2 className="text-xl font-medium py-2">3-Hour Weather Forecast</h2>
   <div className="flex flex-wrap">
    {firstFiveForecast.map((dailyForecast, index) => (
     <div key={index} className="backdrop-blur-lg  rounded p-2  m-1">
      <div>
       <div className="flex gap-4 items-center">
        <img
         src={weatherIcon[dailyForecast.weather[0].main]}
         alt=""
         className="w-[60px]"
        />
        <p className="text-white text-lg">
         {(dailyForecast.main.temp - 273.15).toFixed(2)}°
        </p>
       </div>
       <div className="pt-2">
        <p className="text-white text-xs">
         {new Date(dailyForecast?.dt * 1000).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
         })}
        </p>
        <p className="text-white text-xs">
         Time: {new Date(dailyForecast.dt * 1000).toLocaleTimeString()}
        </p>

        <p className="text-white text-xs">
         Weather: {dailyForecast.weather[0].main}
        </p>
        <p className="text-white text-xs">
         Description: {dailyForecast.weather[0].description}
        </p>
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};
