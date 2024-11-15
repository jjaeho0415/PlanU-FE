import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

const Layout: React.FC = () => {
  return (
    <div className={styles.Container}>
      <Outlet />
    </div>
  );
};

export default Layout;
