import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Card } from "@/components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Sunnyandwindy from "../../public/Sunnyandwindy.svg";
import Rainbow from "../../public/Rainbow.svg";
import Sunnyandsnowy from "../../public/Sunny and snowy.svg";
import Snowfall from 'react-snowfall'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const date = new Date();
  let formatDate =
    date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
  const [image, setImage] = useState("");
  const [state, setState] = useState("");
  const [celsiusTemperature, setCelsiusTemperature] = useState("");
  const [fahrenheitTemperature, setFahrenheitTemperature] = useState("");
  const [country, setCountry] = useState("");
  const [error,setError] = useState("")
  const [forecastData, setForecastData] = useState([
    {
      date: "",
      day: {
        maxtemp_c: "",
        mintemp_c: "",
        maxtemp_f: "",
        mintemp_f: "",
        condition: {
          text:"",
          icon:""
        }
      },
    },
  ]);

  const fetchWeather = async (state: string) => {
    try {
      setError("");
      const response: any = await axios.post(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${state}&aqi=no`
      )
      setState(state);
      setCelsiusTemperature(response.data.current.temp_c);
      setFahrenheitTemperature(response.data.current.temp_f);
      setCountry(response.data.location.country);
      setImage(response.data.current.condition.icon);
    } catch (error) {
      setError("No matching location found");
    }
   
    
  };

  const fetchWeatherForecast = async (state: string) => {

    try {
      setError("");
      const forecast: any = await axios.post(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${state}&aqi=no&days=5`
      )
  
      const data = forecast.data.forecast.forecastday;
      
  
      setForecastData(data);
      
    } catch (error) {
      setError("No matching location found");
    }
   
  };

  const clearCurrentData = () => {
    if (forecastData.length>1) {
      setState("");
    }
  }

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  return (
    <>
      <Head>
        <title>Weather app</title>
        <meta name="description" content="Task for trademarkia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.body}>
        <Snowfall snowflakeCount={20} style={{"zIndex":-10}}/>
        <Header />
        <SearchBar
          fetchWeather={fetchWeather}
          fetchWeatherForecast={fetchWeatherForecast}
          clearCurrentData={clearCurrentData}
        />
        
        {state && !error ? (
          <div className={styles.cardContainer}>
            <Card
              day="Today"
              date={formatDate}
              state={state}
              celsiusTemperature={celsiusTemperature}
              fahrenheitTemperature={fahrenheitTemperature}
              image={`http:${image}`}
              country={country}
            />
            <Card
              day="Tommorow"
              date={forecastData[0].date}
              state={state}
              celsiusMaxTemperature={forecastData[0].day.maxtemp_c}
              fahrenheitMaxTemperature={forecastData[0].day.maxtemp_f}
              celsiusMinTemperature={forecastData[0].day.mintemp_c}
              fahrenheitMinTemperature={forecastData[0].day.mintemp_f}
              image={`https:${forecastData[0].day.condition.icon}`}
              country={country}
            />
          </div>
        ) : (
          <h1 style={{"fontSize":"1rem","textAlign":"center"}}>{error}</h1>
        )}
        {state && !error ? (
          <>
            <h1 className={styles.next} style={{ textAlign: "center", marginTop: "5%" }}>
              NEXT 4 DAYS DATA
            </h1>
            <div className={styles.cardContainer}>
              {forecastData.slice(1).map((data) => {
                return (
                  <Card
                    date={data.date}
                    day={weekday[new Date(data.date).getDay()]}
                    key={data.date}
                    state={state}
                    celsiusMaxTemperature={data.day.maxtemp_c}
                    fahrenheitMaxTemperature={data.day.maxtemp_f}
                    celsiusMinTemperature={data.day.mintemp_c}
                    fahrenheitMinTemperature={data.day.mintemp_f}
                    image={`https:${data.day.condition.icon}`}
                    country={country}
                  />
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
