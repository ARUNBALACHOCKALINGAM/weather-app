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
import Sunnyandsnowy from "../../public/Sunny and snowy.svg"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const date = new Date();
  let formatDate =
    date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
  const [image, setImage] = useState("");
  const [state, setState] = useState("");
  const [celsiusTemperature, setCelsiusTemperature] = useState("");
  const [fahrenheitTemperature, setFahrenheitTemperature] = useState("");

  const fetchWeather = async (state: string) => {
    const response: any = await axios.post(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${state}&aqi=no`
    );
    setState(state);
    setCelsiusTemperature(response.data.current.temp_c);
    setFahrenheitTemperature(response.data.current.temp_f);

    switch (response.data.current.condition.text) {
      case "Partly cloudy":
        setImage(Sunnyandwindy);
        break;
      case "Clear":
        setImage(Rainbow);
        break;
      default:
        setImage(Sunnyandsnowy);
        break;
    }


    const forecast: any = await axios.post(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${state}&aqi=no`
    );


    
  };



  return (
    <>
      <Head>
        <title>Weather app</title>
        <meta name="description" content="Task for trademarkia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.body}>
        <Header />
        <SearchBar fetchWeather={fetchWeather} />
        {state ? (
          <div className={styles.cardContainer}>
            <Card
              day="Today"
              date={formatDate}
              state={state}
              celsiusTemperature={celsiusTemperature}
              fahrenheitTemperature={fahrenheitTemperature}
              image={image}
            />
             <Card
              day="Tommorow"
              state={state}
              celsiusTemperature={celsiusTemperature}
              fahrenheitTemperature={fahrenheitTemperature}
              image={image}
            />
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
