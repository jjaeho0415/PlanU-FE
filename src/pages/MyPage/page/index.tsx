import { useGetUserInfo } from "@api/user/getUserInfo";
import useAuthStore from "@store/useAuthStore";
import Header from "../../../components/headers/OnlyTextHeader";
import Footer from "../../../components/nav-bar/BottomNavBar";
import ButtonSection from "../components/ButtonSection";
import MenuSection from "../components/MenuSection";
import ProfileSection from "../components/ProfileSection";
import styles from "./myPage.module.scss";

const MyPage = () => {
  const { accessToken } = useAuthStore();
  const { data: userInfo } = useGetUserInfo(accessToken);
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
      {userInfo ? (
        <>
          <Header title="마이페이지" backgroundColor="white" />
          <div className={styles.whiteBackground}>
            <div className={styles.profileSection}>
              <ProfileSection
                name={userInfo.name}
                username={userInfo.username}
                email={userInfo.email}
                birthDate={userInfo.birthday}
                profileImage={userInfo.profileImage}
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
        </>
      ) : (
        <div>사용자 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default MyPage;
