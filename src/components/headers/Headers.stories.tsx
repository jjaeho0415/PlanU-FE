import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import styles from "./headerStory.module.scss";
import HasOnlyBackArrowHeader from "./HasOnlyBackArrowHeader";
import ChatListHeader from "@pages/ChatListPage/components/ChatListHeader";
import CalenderHeader from "./CalenderHeader";
import HasTwoIconHeader from "./HasTwoIconHeader";
import HasOnlyRightIconHeader from "./HasOnlyRightIconHeader";
import { useState } from "react";
import ChatListSearchHeader from "@pages/ChatListSearchPage/components/ChatListSearchHeader";
import ChattingHeader from "@pages/ChattingPage/components/ChattingHeader";
import cat from "@assets/images/cat.jpg";
import OnlyTextHeader from "./OnlyTextHeader";

function Headers() {
  const [isBookMark, setIsBookmark] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const handleClick = () => {
    setIsBookmark(!isBookMark);
  };
  return (
    <div className={styles.mainContainer}>
      <div>
        <h2>HasOnlyBackArrowHeader</h2>
        <div className={styles.Container}>
          <HasOnlyBackArrowHeader
            title="가입하기"
            pageType="login"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="로그인"
            pageType="login"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="아이디/비밀번호 찾기"
            pageType="login"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="가능한 날짜 선택"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="가능한 날짜 보기"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="프로필 수정"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="친구 관리"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="그룹 생성하기"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="멤버"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="멤버 초개"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyBackArrowHeader
            title="회원 등록"
            handleClick={() => {
              return;
            }}
          />
        </div>
      </div>

      <div>
        <h2>CalenderHeader</h2>
        <div className={styles.Container}>
          <CalenderHeader
            title="그룹 달력"
            type="group"
            handleBackArrowClick={() => {
              return;
            }}
            handleMiniCalenderClick={() => {
              return;
            }}
          />
          <CalenderHeader
            title="나의 달력"
            type="my"
            handleBackArrowClick={() => {
              return;
            }}
            handleMiniCalenderClick={() => {
              return;
            }}
          />
        </div>
      </div>

      <div>
        <h2>ChatListHeader</h2>
        <div className={styles.Container}>
          <ChatListHeader
            handleAlertClick={() => {
              return;
            }}
            handleSearchClick={() => {
              return;
            }}
            isExistNoReadAlarms={true}
          />
          <ChatListHeader
            handleAlertClick={() => {
              return;
            }}
            handleSearchClick={() => {
              return;
            }}
            isExistNoReadAlarms={false}
          />
        </div>
      </div>

      <div>
        <h2>ChatListSearchHeader</h2>
        <div className={styles.Container}>
          <ChatListSearchHeader searchText={searchText} setSearchText={setSearchText} />
        </div>
      </div>

      <div>
        <h2>ChattingHeader</h2>
        <div className={styles.Container}>
          <ChattingHeader
            groupImage={cat}
            groupName="PlanU"
            handleLeftClick={() => {
              return;
            }}
            handleRightClick={() => {
              return;
            }}
          />
        </div>
      </div>

      <div>
        <h2>HasTwoIconHeader</h2>
        <div className={styles.Container}>
          <HasTwoIconHeader
            title="2024.02.19 (화)"
            rightType="moreIcon"
            handleLeftClick={() => {
              return;
            }}
            handleRightClick={() => {
              return;
            }}
            backgroundColor="purple"
          />
          <HasTwoIconHeader
            title="2024.02.19 (화)"
            rightType="button"
            handleLeftClick={() => {
              return;
            }}
            handleRightClick={() => {
              return;
            }}
            backgroundColor="purple"
          />
          <HasTwoIconHeader
            title="2024.02.19 (화)"
            rightType="button"
            handleLeftClick={() => {
              return;
            }}
            handleRightClick={() => {
              return;
            }}
            backgroundColor="white"
          />
          <HasTwoIconHeader
            title="검색"
            rightType="checkIcon"
            handleLeftClick={() => {
              return;
            }}
            handleRightClick={() => {
              return;
            }}
            backgroundColor="white"
          />
          <HasTwoIconHeader
            title="검색"
            rightType="button"
            handleLeftClick={() => {
              return;
            }}
            handleRightClick={() => {
              return;
            }}
            backgroundColor="white"
          />
        </div>
      </div>

      <div>
        <h2>HasOnlyRightIconHeader</h2>
        <div className={styles.Container}>
          <HasOnlyRightIconHeader
            title="PlanU"
            rightType="alert"
            isExistNoReadAlarms={true}
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyRightIconHeader
            title="PlanU"
            rightType="alert"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyRightIconHeader
            title="춘천팟"
            rightType="star"
            handleClick={handleClick}
            isBookmark={isBookMark}
          />
          <HasOnlyRightIconHeader
            title="새로운 일정"
            rightType="x"
            handleClick={() => {
              return;
            }}
          />
          <HasOnlyRightIconHeader
            title="가능한 날짜 보기"
            rightType="calender"
            handleClick={() => {
              return;
            }}
          />
        </div>
      </div>

      <div>
        <h2>OnlyTextHeader</h2>
        <div className={styles.Container}>
          <OnlyTextHeader title="가입 완료" backgroundColor="purple" />
          <OnlyTextHeader title="마이페이지" backgroundColor="white" />
          <OnlyTextHeader title="가능한 날짜 보기" backgroundColor="purple" />
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof Headers> = {
  title: "Headers",
  component: Headers,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Headers>;

export const Default: Story = {
  args: {},
};
