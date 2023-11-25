import { useState, useEffect } from 'react';

export const Weather = ({ weatherData }) => {
  const [weather, setWeather] = useState(weatherData);

  // Use useEffect to update the state when weatherData changes
  useEffect(() => {
    setWeather(weatherData);
  }, [weatherData]);

  return (
    <>
      <div className="lg:max-mx-4xl">
        <div className="bg-white p-5 rounded text-gray-400">
          <div>
          </div>
          <div className="flex flex-col">
            <h1 className='font-bold text-2xl'>{weather?.weatherResponse?.main?.feels_like}°</h1>
            <h1>{weather?.location}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
