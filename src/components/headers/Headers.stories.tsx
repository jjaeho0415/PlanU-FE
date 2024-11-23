import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import styles from "./headerStory.module.scss";
import HasOnlyBackArrowHeader from "./HasOnlyBackArrowHeader";
import ChattingHeader from "./ChattingHeader";
import CalenderHeader from "./CalenderHeader";
import HasTwoIconHeader from "./HasTwoIconHeader";
import HasOnlyRightIconHeader from "./HasOnlyRightIconHeader";

function Headers() {
  return (
    <div className={styles.MainContainer}>
      <div>
        <h1>HasOnlyBackArrowHeader</h1>
        <div className={styles.Container}>
          <HasOnlyBackArrowHeader
            title="가입하기"
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
        </div>
      </div>

      <div>
        <h1>CalenderHeader</h1>
        <div className={styles.Container}>
          <CalenderHeader
            title="그룹 달력"
            handleBackArrowClick={() => {
              return;
            }}
            handleMiniCalenderClick={() => {
              return;
            }}
            handleMoreIconClick={() => {
              return;
            }}
          />
          <CalenderHeader
            title="이달의 달력"
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
        <h1>ChattingHeader</h1>
        <div className={styles.Container}>
          <ChattingHeader
            handleAlertClick={() => {
              return;
            }}
            handleSearchClick={() => {
              return;
            }}
            isExistNoReadAlarms={true}
          />
          <ChattingHeader
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
        <h1>HasTwoIconHeader</h1>
        <div className={styles.Container}>
          <HasTwoIconHeader />
          <HasTwoIconHeader />
          <HasTwoIconHeader />
        </div>
      </div>

      <div>
        <h1>HasOnlyRightIconHeader</h1>
        <div className={styles.Container}>
          <HasOnlyRightIconHeader />
          <HasOnlyRightIconHeader />
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
