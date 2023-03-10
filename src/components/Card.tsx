import * as React from "react";
import styles from "@/styles/Card.module.css";
import Sunnyandwindy from "../../public/Sunnyandwindy.svg";
import Image from "next/image";

type Props = {
  day: String;
  date: String;
  state: String;
  celsiusTemperature?: String;
  fahrenheitTemperature?: String;
  celsiusMaxTemperature?: String;
  celsiusMinTemperature?: String;
  fahrenheitMaxTemperature?: String;
  fahrenheitMinTemperature?: String;
  humidity?: String;
  windspeed?: String;
  image: string;
  country: string;
};

export const Card = (props: Props) => {
  
  const initialOption = localStorage.getItem("option") ? localStorage.getItem("option") : "Celsius";
  const [option, setOption] = React.useState(initialOption);


  const selectOption = (e:any) => {
    const value = e.target.innerHTML === "C" ? "Celsius" : "Fahrenheit";
    localStorage.setItem("option",value)
    setOption(value)
  }
  
  return (
    <div className={styles.cardContainer}>
      <img src={props.image} width={120} height={120} alt="sunnyandwindy" />
      <div>
        <h1 style={{ fontSize: "1.2rem" }}>
          {props.day}, {props.date}{" "}
        </h1>
        <p>{props.state}, {props.country}</p>
        {props.day === "Today" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "baseline",
              textAlign: "right",
            }}
          >
            <p style={{ fontSize: "3rem" }}>
              {option === "Celsius"
                ? props.celsiusTemperature
                : props.fahrenheitTemperature}°
            </p>
            <p
              style={{
                marginLeft: "20px",
                opacity: option === "Celsius" ? 1 : 0.5,
              }}
              onClick={selectOption}
            >
              C
            </p>
            <p
              style={{
                marginLeft: "20px",
                opacity: option === "Fahrenheit" ? 1 : 0.5,
              }}
              onClick={selectOption}
            >
              F
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "baseline",
                textAlign: "right"
              }}
            >
              <p style={{"whiteSpace":"nowrap"}}>Min temp: </p>
              <p style={{ fontSize: "1.5rem",paddingLeft:"20px" }}>
                {option === "Celsius"
                  ? props.celsiusMinTemperature
                  : props.fahrenheitMinTemperature}°
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  opacity: option === "Celsius" ? 1 : 0.5,
                }}
                onClick={selectOption}
              >
                C
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  opacity: option === "Fahrenheit" ? 1 : 0.5,
                }}
                onClick={selectOption}
              >
                F
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "baseline",
                textAlign: "right",
              }}
            >
              <p style={{"whiteSpace":"nowrap"}}>Max temp: </p>
              <p style={{ fontSize: "1.5rem",paddingLeft:"20px" }}>
                {option === "Celsius"
                  ? props.celsiusMaxTemperature
                  : props.fahrenheitMaxTemperature}°
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  opacity: option === "Celsius" ? 1 : 0.5,
                }}
                onClick={selectOption}
              >
                C
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  opacity: option === "Fahrenheit" ? 1 : 0.5,
                }}
                onClick={selectOption}
              >
                F
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "baseline",
                textAlign: "right",
                flexWrap:"wrap",
                fontSize: "1rem",
                marginTop:"4%"
              }}
            >
              <p>Win speed:</p>
              <p>
                {props.windspeed}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "baseline",
                textAlign: "right",
                flexWrap:"wrap",
                fontSize: "1rem",
                marginTop:"4%"
              }}
            >
              <p>Humidity:</p>
              <p>
                {props.humidity}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
