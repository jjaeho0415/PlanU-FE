import React, { useState } from "react";
import styles from "./inlineEditableProfileItem.module.scss";

interface InlineEditableProfileItemProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

const InlineEditableProfileItem: React.FC<InlineEditableProfileItemProps> = ({
  label,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <input type="text" value={inputValue} onChange={handleInputChange} className={styles.input} />
    </div>
  );
};

export default InlineEditableProfileItem;
