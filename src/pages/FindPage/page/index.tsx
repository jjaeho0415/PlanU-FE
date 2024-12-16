import React from "react";
import styles from "./find.module.scss";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import FindTypeTab from "../components/FindTypeTab";

const FindPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="아이디/비밀번호 찾기"
        pageType="login"
        handleClick={() => navigate("/login")}
      />
      <FindTypeTab />
    </div>
  );
};

export default FindPage;
