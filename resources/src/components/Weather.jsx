import { useState, useEffect } from 'react';

export const Weather = ({ weatherData }) => {
  const [weather, setWeather] = useState(weatherData);

  // Use useEffect to update the state when weatherData changes
  useEffect(() => {
    setWeather(weatherData);
  }, [weatherData]);

  return (
    <>
      <div className="bg-white p-5 rounded">
        <h1 className="text-gray-500">
          Feels like: {weather?.weatherResponse?.main?.feels_like}
        </h1>
      </div>
    </>
  );
};
