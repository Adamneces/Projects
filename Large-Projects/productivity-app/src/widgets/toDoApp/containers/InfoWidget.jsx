import React, { useState, useEffect } from 'react';
import styles from '../ToDoApp.module.css';

const InfoWidget = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
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
                apiUrl = `${baseUrl}${endpoint}?key=${apiKey}&q=Torrevieja&days=3&aqi=no&alerts=no`;
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
  
  return (
    <div className={styles.info_widget_container}>
      {weatherData ? (
        <>
          <h1 className={styles.info_widget_heading}>{weatherData.location.name} - {weatherData.location.country}</h1>
          <div className={styles.info_widget_infoContainer}>
            <p className={styles.info_widget_currentTemperature}>{weatherData.current.temp_c}°C</p>
            <img className={styles.info_widget_icon} src={weatherData.current.condition.icon} alt="Current Weather Icon" />
          </div>
          <div className={styles.info_widget_forecastContainer}>
            {weatherData.forecast.forecastday.map((forecastDay, index) => (
              <div className={styles.info_widget_forecastDayContainer} key={index}>
                <div className={styles.info_widget_forecast_day_icon}>
                  <p className={styles.info_widget_forecastDay}>{getDayOfWeek(forecastDay.date)}</p>
                  <img className={styles.info_widget_forecastIcon} src={forecastDay.day.condition.icon} alt="Forecast Weather Icon" />
                </div>
                <span className={styles.info_widget_forecastTemp}><span className={styles.minTemp}>{forecastDay.day.mintemp_c}</span>/{forecastDay.day.maxtemp_c}</span>
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