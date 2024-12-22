import React, { useEffect, useState } from "react";
import styles from "./find.module.scss";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import FindTypeTab from "../components/FindTypeTab";
import FindInput from "../components/FindInput";
import { DefaultButton } from "@components/buttons/DefaultButton";

const FindPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"id" | "pw">("id");
  const [buttonText, setButtonText] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);

  useEffect(() => {
    switch (selectedTab) {
      case "id":
        setButtonText("아이디 찾기");
        break;
      case "pw":
        setButtonText("비밀번호 변경");
    }
  }, []);

  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="아이디/비밀번호 찾기"
        pageType="login"
        handleClick={() => navigate("/login")}
      />
      <FindTypeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <FindInput findType={selectedTab} setIsDisabledButton={setIsDisabledButton} />
      <div className={styles.UsernameBox}>{username}</div>
      <div className={styles.ButtonBox}>
        <DefaultButton
          buttonText={buttonText}
          onClick={() => {
            selectedTab === "id" ? handleFindId() : handleChangePassword();
          }}
          isDisabled={isDisabledButton}
        />
      </div>
    </div>
  );
};

export default FindPage;
