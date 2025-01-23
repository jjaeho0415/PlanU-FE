import React from "react";
import styles from "./Inputs.module.scss";

interface props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleBox: React.FC<props> = ({ title, setTitle }) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
