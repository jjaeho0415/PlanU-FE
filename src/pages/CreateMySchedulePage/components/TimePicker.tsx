import React, { useState } from "react";
import styles from "./timePicker.module.scss";
import Icon_topArrow from "../../../assets/Icons/arrow/TopArrow_sm.svg?react";
import Icon_bottomArrow from "../../../assets/Icons/arrow/BottomArrow_sm.svg?react";

interface props {
  amPm: "오전" | "오후";
  setAmPm: React.Dispatch<React.SetStateAction<"오전" | "오후">>;
  hour: number;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  minute: number;
  setMinute: React.Dispatch<React.SetStateAction<number>>;
}

const TimePicker: React.FC<props> = ({ amPm, setAmPm, hour, setHour, minute, setMinute }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.WithTextBox}>
        <div className={styles.Box}>
          <Icon_topArrow className={styles.Cursor} />
          <input className={styles.Input} value="오후" />
          <Icon_bottomArrow className={styles.Cursor} />
        </div>
      </div>
      <div className={styles.WithTextBox}>
        <div className={styles.Box}>
          <Icon_topArrow className={styles.Cursor} />
          <input className={styles.Input} value={hour} />
          <Icon_bottomArrow className={styles.Cursor} />
        </div>
        <p className={styles.Text}>시</p>
      </div>
      <div className={styles.WithTextBox}>
        <div className={styles.Box}>
          <Icon_topArrow className={styles.Cursor} />
          <input className={styles.Input} value={minute} />
          <Icon_bottomArrow className={styles.Cursor} />
        </div>
        <p className={styles.Text}>분</p>
      </div>
    </div>
  );
};

export default TimePicker;
