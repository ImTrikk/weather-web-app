import { useState, useEffect } from 'react';

export const Weather = ({ weatherData, onChangeCondition }) => {
 const [weather, setWeather] = useState(weatherData);

 useEffect(() => {
  setWeather(weatherData);
 }, [weatherData]);

 const getIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
 };

 useEffect(() => {
  onChangeCondition(weather?.weatherResponse?.weather[0]?.main);
 }, [weather]);

 return (
  <div className="lg:max-mx-4xl">
   <div className="bg-[#fafafa] p-5 rounded text-gray-500">
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
       <h1 className="text-xs">{weather?.weatherResponse?.name}</h1>
      </div>
      <div>
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
       {weather?.weatherResponse?.weather[0]?.icon && (
        <img
         src={getIconUrl(weather?.weatherResponse?.weather[0]?.icon)}
         alt="Weather Icon"
        />
       )}
      </div>
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
