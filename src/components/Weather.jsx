import Search_icon from "../assets/search.png";
import Clear_icon from "../assets/clear.png";
import Wind_icon from "../assets/wind.png";
import snow_icon from "../assets/snow.png";
import rain_icon from "../assets/rain.png";
import Cloud_icon from "../assets/cloud.png";
import Drizzle_icon from "../assets/drizzle.png";

import Humidity_icon from "../assets/humidity.png";

import "./Weather.css";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(false);
  const referenceRef = useRef();

  const icons = {
    "01d": Clear_icon,
    "01n": Clear_icon,
    "02d": Cloud_icon,
    "02n": Cloud_icon,
    "03d": Cloud_icon,
    "03n": Cloud_icon,
    "04d": Drizzle_icon,
    "04n": Drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const Search = async (city) => {

    if(city==""){
      alert("enter city name");
      return;
    }
    
    try {


      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = icons[data.weather[0].icon] || Clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      weatherData(false)
      console.error("You got error!!!");
    }
  };

  useEffect(() => {
    Search("London");
  }, []);
  return (
    <div className="weather-page">
      <div className="search-bar" >
        <input type="text" placeholder="Search" ref={referenceRef}/>
        <img src={Search_icon} alt=" search-icon" onClick={()=>Search(referenceRef.current.value)} />
      </div>
      <img src={weatherData.icon} alt="Sunnny" className="weather-icon" />
      <p className="temprature">{weatherData.temprature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={Humidity_icon} alt="humidity-image" />
          <span>
            {weatherData.humidity}% <br /> Humidity
          </span>

          {/* <span>Humidity</span> */}
        </div>
        <div className="col">
          <img src={Wind_icon} alt="Windy-image" />
          <span>
            {weatherData.windSpeed} KM/H
            <br />
            Wind Speed
          </span>
          {/* <br /> <p>3.6km/h</p> */}
        </div>
      </div>
    </div>
  );
}
export default Weather;
