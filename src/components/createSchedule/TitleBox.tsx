import React from "react";
import styles from "./Inputs.module.scss";
import useScheduleStore from "@store/useScheduleStore";

const TitleBox: React.FC = () => {
  const { title, setTitle } = useScheduleStore();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setTitle) {
      setTitle(e.target.value);
    }
  };

  return (
    <input
      className={styles.Input}
      placeholder="제목"
      defaultValue={title ?? null}
      onChange={onInputChange}
    ></input>
  );
};

export default TitleBox;
