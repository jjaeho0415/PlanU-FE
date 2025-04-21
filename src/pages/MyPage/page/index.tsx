import { useGetUserInfo } from "@api/user/getUserInfo";
import useAuthStore from "@store/useAuthStore";
import Header from "../../../components/headers/OnlyTextHeader";
import Footer from "../../../components/nav-bar/BottomNavBar";
import ButtonSection from "../components/ButtonSection";
import MenuSection from "../components/MenuSection";
import ProfileSection from "../components/ProfileSection";
import styles from "./myPage.module.scss";
import { usePostLogout } from "@api/user/postLogout";

const MyPage = () => {
  const { accessToken } = useAuthStore();
  const { data: userInfo } = useGetUserInfo(accessToken);
  const { mutate: logout } = usePostLogout();
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

  const handleMenuClick = (menuItem: string) => {
    switch (menuItem) {
      case "알림 설정":
        // 알림 설정 추후 개발
        break;
      case "암호 잠금":
        // 암호 잠금 추후 개발
        break;
      case "공지사항":
        // 공지사항 추후 개발
        break;
      case "서비스 이용약관":
        // 서비스 이용약관 추후 링크 연결
        break;
      case "개인정보 처리 방침":
        window.open(
          "https://quartz-guavaberry-b5f.notion.site/14ec348b5aab80d2ae60e91438fed778",
          "_blank",
        );
        break;
      case "회원 탈퇴":
        // 회원 탈퇴 추후 개발
        break;
      case "로그아웃":
        logout();
        break;
      default:
        break;
    }
  };

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
            <MenuSection menuItems={menuData} handleMenuClick={handleMenuClick} />
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
