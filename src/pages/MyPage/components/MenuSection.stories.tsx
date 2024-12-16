import { Meta, StoryObj } from "@storybook/react";
import MenuSection from "./MenuSection";

const meta: Meta<typeof MenuSection> = {
  title: "Components/MenuSection",
  component: MenuSection,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MenuSection>;

export const Default: Story = {
  args: {
    menuItems: [
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
    ],
  },
};
