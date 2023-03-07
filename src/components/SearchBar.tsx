import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import styles from "@/styles/SearchBar.module.css";
import { Country, State, City } from "country-state-city";

// Import Interfaces`
import { ICountry, IState, ICity } from "country-state-city";

type Props = {
  fetchWeather: Function
  fetchWeatherForecast: Function
  clearCurrentData: Function
};

export const SearchBar = (props: Props) => {
  const [searchVal, setSearchVal] = useState("");

  const handleInput = (e: any) => {
    setSearchVal(e.target.value);
    props.clearCurrentData();
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const filteredCountries = State.getAllStates().filter((state) => {
    return (
      state.name.toUpperCase().includes(searchVal.toUpperCase()) && searchVal.length > 2
    );
  });


  return (
    <div className={styles.container}>
      <div className={styles.inputWrap}>
        <AiOutlineSearch
          className="fas fa-search"
          style={{ fontSize: "2rem" }}
        ></AiOutlineSearch>
        <label
          htmlFor="country-search"
          id="inputLabel"
          className={styles.inputLabel}
        >
          Product Search
        </label>
        <input
          onChange={handleInput}
          value={searchVal}
          type="text"
          name="country-search"
          id="country-search"
          className={styles.countrySearch}
          placeholder="Search your city"
        />
        <MdOutlineCancel
          onClick={handleClearBtn}
          className="fas fa-times"
          style={{ fontSize: "2rem" }}
        ></MdOutlineCancel>
      </div>
      {filteredCountries.length < 1 ? (
        <div className={styles.searchWrap}>
        <li className={styles.listItem}>
          <a>{searchVal}</a>
        </li>
        </div>
      ) : (
        <div className={styles.resultsWrap}>
          <ul>
            {filteredCountries.map((country) => {
              return (
                <li key={country.name} className={styles.listItem}>
                  <a onClick={()=>{
                    handleClearBtn();
                    props.fetchWeather(country.name)
                    props.fetchWeatherForecast(country.name)
                  }}>{country.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
