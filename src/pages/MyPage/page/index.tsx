import Header from "../../../components/headers/OnlyTextHeader"; // Header 컴포넌트 경로
import Footer from "../../../components/nav-bar/BottomNavBar"; // Footer 컴포넌트 경로
import ButtonSection from "../components/ButtonSection"; // ButtonSection 컴포넌트 경로
import MenuSection from "../components/MenuSection"; // MenuSection 컴포넌트 경로
import ProfileSection from "../components/ProfileSection"; // ProfileSection 컴포넌트 경로

import styles from "./myPage.module.scss";

const MyPage = () => {
  const menuData = [
    {
      title: "앱 설정",
      items: ["알림 설정", "암호 잠금"],
    },
    {
      title: "이용 안내",
      items: ["공지사항", "서비스 이용약관", "개인정보 처리방침"],
    },
    {
      title: "기타",
      items: ["회원 탈퇴", "로그아웃"],
    },
  ];

  return (
    <div className={styles.myPageContainer}>
      <Header title="마이페이지" backgroundColor="white" />
      <div className={styles.whiteBackground}>
        <div className={styles.profileSection}>
          <ProfileSection
            name="이수현"
            username="su_velyy_."
            email="suhyun2116@gmail.com"
            birthDate="2003.02.19"
          />
        </div>
        <div className={styles.buttonSection}>
          <ButtonSection />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <MenuSection menuItems={menuData} />
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
