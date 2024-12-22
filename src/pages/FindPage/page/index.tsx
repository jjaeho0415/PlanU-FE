import React, { useState } from "react";
import styles from "./find.module.scss";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import FindTypeTab from "../components/FindTypeTab";
import FindButton from "@components/buttons/FindButton";
import FindInput from "../components/FindInput";

const FindPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"id" | "pw">("id");

  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="아이디/비밀번호 찾기"
        pageType="login"
        handleClick={() => navigate("/login")}
      />
      <FindTypeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <FindInput findType={selectedTab} />
    </div>
  );
};

export default FindPage;
