import React, { useState, useEffect } from 'react';

export const Forecast = ({ weatherData }) => {
 const [forecast, setForecast] = useState([]);

 useEffect(() => {
  if (weatherData?.list) {
   setForecast(weatherData.forecastResponse.list);
  }
 }, [weatherData]);

 return (
  <div>
   <h2>5-Day Forecast</h2>
   <div className="flex flex-wrap">
    {forecast?.forecastResponse?.list.map((dailyForecast, index) => (
     <div key={index} className="bg-white w-[100px] h-auto">
      <div>
       <p className="text-white">
        Date:{' '}
        {new Date(
         dailyForecast.forecastResponse?.list.dt * 1000
        ).toLocaleDateString()}
       </p>
       <p className="text-white">
        Temperature: {dailyForecast.forecastResponse?.list.main.temp}°C
       </p>
       <p className="text-white">
        Weather: {dailyForecast.forecastResponse?.list.weather[0].main}
       </p>
       <p className="text-white">
        Description:{' '}
        {dailyForecast.forecastResponse?.list.weather[0].description}
       </p>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};
