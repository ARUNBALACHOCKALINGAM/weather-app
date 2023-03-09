
import * as React from 'react';
import styles from '../styles/DatePicker.module.css';
type Props = {
    setWeatherHistoryDate : Function;
};
export const DatePicker = (props: Props) => {
    const date = new Date();
    let formatDate = date.toISOString().substring(0,10);
    return (
        <div className={styles.dateContainer}>
            <label>Pick a date:</label>
            <input onChange={(e)=>{
                console.log(e.target.value);
                props.setWeatherHistoryDate(e.target.value)
            }} className={styles.dateField} type='date' max={formatDate}/>
        </div>
    );
};