import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "@/styles/Home.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <p>KNOW THE</p>
      <h1 className={styles.headerText}>WEATHER</h1>
      <p>OF YOUR CITY</p>
    </div>
  );
};
