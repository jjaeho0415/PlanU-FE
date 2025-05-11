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
  const [, setSentRequestUsernames] = useState<string[]>([]);

  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  const { data: friendList } = useGetFriendList(accessToken, activeTab);
  const { data: receivedFriendList } = useGetReceiveFriendList(accessToken, activeTab);
  const { data: requestFriendList } = useGetRequestFriendList(accessToken, activeTab);
  const { data: recommendedFriendsList } = useGetRecommendedFriendList(accessToken, activeTab);
  const { data: userInfo } = useGetUserInfo(accessToken);

  const recommendedUsernames = recommendedFriendsList?.friends?.map((f) => f.username) ?? [];

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
            {!!requestFriendList?.friends?.filter(
              (friend) => !recommendedUsernames.includes(friend.username),
            ).length && (
              <>
                <p className={styles.recommendTitle}>보낸 요청</p>
                {requestFriendList.friends
                  .filter((friend) => !recommendedUsernames.includes(friend.username))
                  .map((friend) => (
                    <MemberCard
                      key={friend.username}
                      memberInfo={friend}
                      activeTab={activeTab}
                      hasSentRequest={true}
                      setSentRequestUsernames={setSentRequestUsernames}
                    />
                  ))}
              </>
            )}

            {!!recommendedFriendsList?.friends?.length && (
              <>
                <p className={styles.recommendTitle}>
                  추천 친구{""}
                  <span className={styles.recommendedTotal}>
                    {recommendedFriendsList.totalFriends}
                  </span>
                </p>
                {recommendedFriendsList.friends.map((friend) => {
                  const username = friend.username;
                  if (!username) return null;

                  const isAlreadyRequested = requestFriendList?.friends?.some(
                    (req) => req.username === username,
                  );
                  return (
                    <MemberCard
                      key={username}
                      memberInfo={{
                        name: friend.name,
                        username,
                        profileImageUrl: friend.profileImageUrl,
                      }}
                      activeTab={activeTab}
                      hasSentRequest={isAlreadyRequested}
                      setSentRequestUsernames={setSentRequestUsernames}
                    />
                  );
                })}
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
