import ProfileImage from "@assets/images/cat.jpg";
import { Meta, StoryObj } from "@storybook/react";
import ChatItem from "./ChatItem";

const meta: Meta<typeof ChatItem> = {
  title: "Components/ChatItem",
  component: ChatItem,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ChatItem>;

/** 기본 */
export const Default: Story = {
  args: {
    profileImage: ProfileImage,
    groupName: "V.nets 웹 스터디",
    lastMessage: "이모티콘을 보냈습니다.",
    time: "오후 1:03",
    showNotification: false,
  },
};

/** 읽지 않은 메시지 있음 */
export const UnreadMessages: Story = {
  args: {
    profileImage: ProfileImage,
    groupName: "주점21.26",
    lastMessage: "굿",
    time: "오전 11:20",
    unreadCount: 3,
    showNotification: true,
  },
};

/** 고정 + 읽지 않은 메시지 있는 거 */
export const PinnedWithUnread: Story = {
  args: {
    profileImage: ProfileImage,
    groupName: "KNU 컴퓨터(4)",
    lastMessage: "모두 원하시는 목표 성취하시길!",
    time: "어제",
    unreadCount: 4,
    isPinned: true,
    showNotification: true,
  },
};
