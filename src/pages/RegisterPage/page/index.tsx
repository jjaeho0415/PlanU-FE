import LoginButton from "@components/buttons/LoginButton";
import styles from "./register.module.scss";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.Container}>
      <LoginButton
        buttonType="login"
        onClick={() => {
          return;
        }}
      />
    </div>
  );
};

export default RegisterPage;
