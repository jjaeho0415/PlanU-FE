import { useGetFriendList } from "@api/friend/getFriendList";
import { useGetReceiveFriendList } from "@api/friend/getReceiveFriendList";
import { useGetRequestFriendList } from "@api/friend/getRequestFriendList";
import { useGetUserInfo } from "@api/user/getUserInfo";
import useGetRecommendedFriendList from "@api/friend/getRecommendedFriendList";
import FriendRequestEmptyIcon from "@assets/Icons/myPage/add.svg?react";
import DefaultButton from "@components/buttons/DefaultButton";
import useAuthStore from "@store/useAuthStore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HasOnlyBackArrowHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import FriendsTab from "../components/FriendsTab";
import IDInput from "../components/IDInput";
import MemberCard from "../components/MemberCard";
import styles from "./friendManagementPage.module.scss";

const FriendManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"친구목록" | "받은요청" | "보낸요청">("친구목록");
  const [isEditing, setIsEditing] = useState(false);

  const { accessToken } = useAuthStore();
  const { data: friendList } = useGetFriendList(accessToken, activeTab);
  const { data: receivedFriendList } = useGetReceiveFriendList(accessToken, activeTab);
  const { data: requestFriendList } = useGetRequestFriendList(accessToken, activeTab);

  const { data: recommendedFriendsList } = useGetRecommendedFriendList(accessToken, activeTab);

  const { data: userInfo } = useGetUserInfo(accessToken);
  const navigate = useNavigate();

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className={styles.friendManagementPage}>
      <HasOnlyBackArrowHeader
        title="친구 관리"
        handleClick={() => {
          navigate(-1);
        }}
      />

      <div className={styles.idInput}>
        <IDInput setActiveTab={setActiveTab} />
      </div>

      <div className={styles.myIdInfo}>
        <span>내 아이디</span>
        <span>{userInfo?.username}</span>
      </div>

      <FriendsTab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.tabContent}>
        {activeTab === "친구목록" && (
          <div className={styles.friendList}>
            {friendList?.friends.map((friend, index) => (
              <MemberCard
                key={index}
                memberInfo={friend}
                activeTab={activeTab}
                isEditing={isEditing}
              />
            ))}
          </div>
        )}

        {activeTab === "받은요청" && (
          <div className={styles.friendList}>
            {receivedFriendList?.friends?.length ? (
              receivedFriendList.friends.map((friend, index) => (
                <MemberCard key={index} memberInfo={friend} activeTab={activeTab} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <FriendRequestEmptyIcon />
                <p className={styles.emptyTitle}>받은 친구 요청</p>
                <p className={styles.emptyText}>친구 요청을 받으면 여기에 표시됩니다.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "보낸요청" && (
          <div className={styles.friendList}>
            {requestFriendList?.friends.length ? (
              requestFriendList.friends.map((friend, index) => (
                <MemberCard key={index} memberInfo={friend} activeTab={activeTab} />
              ))
            ) : (
              <>
                <p className={styles.recommendTitle}>
                  추천 친구 <span className={styles.recommendedTotal}>{recommendedFriendsList?.totalFriends}</span>
                </p>
                {recommendedFriendsList?.totalFriends === 0 ? (
                  <div className={styles.emptySection}>추천 친구 목록이 비어있습니다.</div>
                ) : (
                  recommendedFriendsList?.friends.map(
                    (friend: IRecommendedFriendItemType, index: number) => (
                      <MemberCard key={index} memberInfo={friend} activeTab={activeTab} />
                    ),
                  )
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "친구목록" && (
          <div className={styles.footer}>
            <DefaultButton
              buttonText={isEditing ? "완료" : "수정하기"}
              onClick={handleEditToggle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendManagementPage;
