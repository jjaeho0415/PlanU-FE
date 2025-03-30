import React from "react";
import styles from "./inlineEditableProfileItem.module.scss";

interface Props {
  label: string;
  value: string | null;
  setRequestUserInfo: React.Dispatch<React.SetStateAction<IUpdateUserProfileRequest>>;
  requestUserInfo: IUpdateUserProfileRequest;
  isDisabled?: boolean;
}

const InlineEditableProfileItem: React.FC<Props> = ({
  label,
  value,
  setRequestUserInfo,
  requestUserInfo,
  isDisabled = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestUserInfo({
      ...requestUserInfo,
      name: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <input
        type="text"
        value={value ?? ""}
        onChange={handleInputChange}
        className={styles.input}
        disabled={isDisabled}
      />
    </div>
  );
};

export default InlineEditableProfileItem;
