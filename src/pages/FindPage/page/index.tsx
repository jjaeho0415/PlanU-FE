import React, { useEffect, useState } from "react";
import styles from "./find.module.scss";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import FindTypeTab from "../components/FindTypeTab";
import FindInput from "../components/FindInput";
import { DefaultButton } from "@components/buttons/DefaultButton";
import { usePostFindId } from "@api/user/postFindId";
import { usePostFindPw } from "@api/user/postFindPw";

const FindPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"id" | "pw">("id");
  const [buttonText, setButtonText] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const { mutate: findId } = usePostFindId();
  const { mutate: changePassword } = usePostFindPw();

  useEffect(() => {
    switch (selectedTab) {
      case "id":
        setButtonText("아이디 찾기");
        break;
      case "pw":
        setButtonText("비밀번호 변경");
    }
  }, []);

  useEffect(() => {
    setEmail("");
    setUsername("");
    setNewPassword("");
  }, [selectedTab]);

  const handleFindId = () => {
    findId(
      { email },
      {
        onSuccess: (res) => {
          setUsername(res.resultMsg);
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };

  const handleChangePassword = () => {
    changePassword(
      { username, email, newPassword },
      {
        onSuccess: () => {
          alert("비밀번호가 변경되었습니다.");
          navigate("login");
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };

  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="아이디/비밀번호 찾기"
        pageType="login"
        handleClick={() => navigate("/login")}
      />
      <FindTypeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <FindInput
        findType={selectedTab}
        setIsDisabledButton={setIsDisabledButton}
        setUsername={setUsername}
        setEmail={setEmail}
        setNewPassword={setNewPassword}
      />
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
