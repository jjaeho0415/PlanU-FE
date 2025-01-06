import React, { useState } from "react";
import styles from "./idInput.module.scss";

const IDInput: React.FC = () => {
  const [id, setId] = useState("");
  const maxLength = 20;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setId(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={id}
        onChange={handleChange}
        placeholder="ID로 친구 추가"
        className={styles.input}
      />
      <span className={styles.counter}>
        {id.length}/{maxLength}
      </span>
    </div>
  );
};

export default IDInput;
