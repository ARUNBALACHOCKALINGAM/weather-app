import * as React from "react";
import styles from "@/styles/Card.module.css";
import Sunnyandwindy from "../../public/Sunnyandwindy.svg";
import Image from "next/image";

type Props = {
    day: String;
    date: String;
    state: String;
    celsiusTemperature: String;
    fahrenheitTemperature: String;
    image: string
};

export const Card = (props: Props) => {
  const date = new Date();
  let formatDate = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
  const [option, setOption] = React.useState("Celsius");

  return (
    <div className={styles.cardContainer}>
      <Image src={props.image} width={120} height={120} alt="sunnyandwindy"/>
      <div>
        <h1 style={{ fontSize: "1.2rem" }}>{props.day}, {props.date} </h1>
        <p>{props.state}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "baseline",
            textAlign:"right"
          }}
        >
          <p style={{ fontSize: "3rem" }}>{option === "Celsius" ? props.celsiusTemperature : props.fahrenheitTemperature}</p>
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
      </div>
    </div>
  );
};
