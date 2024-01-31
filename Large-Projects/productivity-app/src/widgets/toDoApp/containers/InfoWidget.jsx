import React, { useState, useEffect } from 'react';
import styles from './InfoWidget.module.css';

const InfoWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const apiKey = '85db84b7df32425a852135626242001';
  const baseUrl = 'http://api.weatherapi.com/v1';
  const endpoint = '/forecast.json';

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
          // You might want to handle this error case and set a default location if needed
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser');
    }
  }, []); 

        useEffect(() => {
          const fetchData = async () => {
            try {
              let apiUrl;
        
              if (userLocation) {
                apiUrl = `${baseUrl}${endpoint}?key=${apiKey}&q=${userLocation.latitude},${userLocation.longitude}&days=3&aqi=no&alerts=no`;
              } else {
                apiUrl = `${baseUrl}${endpoint}?key=${apiKey}&q=Florence&days=3&aqi=no&alerts=no`;
              }      
              const response = await fetch(apiUrl);
        
              if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
              } else {
                console.error('Failed to fetch weather data');
              }
            } catch (error) {
              console.error('Error fetching weather data:', error);
            }
          };
        
          fetchData();
        }, [userLocation]); 

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const dateObj = new Date(dateString);
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    return dayOfWeek;
  };

  console.log(weatherData);
  return (
    <div className={styles.container}>
      {weatherData ? (
        <>
          <h1 className={styles.heading}>{weatherData.location.name} - {weatherData.location.country}</h1>
          <div className={styles.infoContainer}>
            <p className={styles.currentTemperature}>{weatherData.current.temp_c}°C</p>
            <img className={styles.icon} src={weatherData.current.condition.icon} alt="Current Weather Icon" />
          </div>
          <div className={styles.forecastContainer}>
            {weatherData.forecast.forecastday.map((forecastDay, index) => (
              <div className={styles.forecastDayContainer} key={index}>
                <div className={styles.forecast_day_icon}>
                  <p className={styles.forecastDay}>{getDayOfWeek(forecastDay.date)}</p>
                  <img className={styles.forecastIcon} src={forecastDay.day.condition.icon} alt="Forecast Weather Icon" />
                </div>
                <span className={styles.forecastTemp}><span className={styles.minTemp}>{forecastDay.day.mintemp_c}</span>/{forecastDay.day.maxtemp_c}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span>no weather data available</span>
      )}
    </div>
  );
};

export default InfoWidget;