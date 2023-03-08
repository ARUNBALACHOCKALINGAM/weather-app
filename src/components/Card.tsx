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
  image: string;
  country: string;
};

export const Card = (props: Props) => {
  const [option, setOption] = React.useState("Celsius");
  
  console.log(props.image);
  return (
    <div className={styles.cardContainer}>
      <Image src={props.image} width={120} height={120} alt="sunnyandwindy" />
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
                : props.fahrenheitTemperature}
            </p>
            <p
              style={{
                marginLeft: "20px",
                opacity: option === "Celsius" ? 1 : 0.5,
              }}
              onClick={() => setOption("Celsius")}
            >
              C
            </p>
            <p
              style={{
                marginLeft: "20px",
                opacity: option === "Fahrenheit" ? 1 : 0.5,
              }}
              onClick={() => setOption("Fahrenheit")}
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
                  : props.fahrenheitMinTemperature}
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  opacity: option === "Celsius" ? 1 : 0.5,
                }}
                onClick={() => setOption("Celsius")}
              >
                C
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  opacity: option === "Fahrenheit" ? 1 : 0.5,
                }}
                onClick={() => setOption("Fahrenheit")}
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
                  : props.fahrenheitMaxTemperature}
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  opacity: option === "Celsius" ? 1 : 0.5,
                }}
                onClick={() => setOption("Celsius")}
              >
                C
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  opacity: option === "Fahrenheit" ? 1 : 0.5,
                }}
                onClick={() => setOption("Fahrenheit")}
              >
                F
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
