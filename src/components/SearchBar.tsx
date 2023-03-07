import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import styles from "@/styles/SearchBar.module.css";
import { Country, State, City } from "country-state-city";
console.log(Country.getAllCountries());
console.log(State.getAllStates());

// Import Interfaces`
import { ICountry, IState, ICity } from "country-state-city";

type Props = {
  fetchWeather: Function
};

export const SearchBar = (props: Props) => {
  const [searchVal, setSearchVal] = useState("");

  const handleInput = (e: any) => {
    setSearchVal(e.target.value);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const filteredProducts = State.getAllStates().filter((state) => {
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
          htmlFor="product-search"
          id="inputLabel"
          className={styles.inputLabel}
        >
          Product Search
        </label>
        <input
          onChange={handleInput}
          value={searchVal}
          type="text"
          name="product-search"
          id="product-search"
          className={styles.productSearch}
          placeholder="Search your city"
        />
        <MdOutlineCancel
          onClick={handleClearBtn}
          className="fas fa-times"
          style={{ fontSize: "2rem" }}
        ></MdOutlineCancel>
      </div>
      {filteredProducts.length < 1 ? (
        <div className={styles.searchWrap}>
        <li className={styles.listItem}>
          <a>{searchVal}</a>
        </li>
        </div>
      ) : (
        <div className={styles.resultsWrap}>
          <ul>
            {filteredProducts.map((product) => {
              return (
                <li key={product.name} className={styles.listItem}>
                  <a onClick={()=>{
                    handleClearBtn();
                    props.fetchWeather(product.name)
                  }}>{product.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
