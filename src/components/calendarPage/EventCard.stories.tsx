import { Meta, StoryObj } from "@storybook/react";
import EventCard from "./EventCard";

function EventCardStory() {
  const scheduleItem = {
    startTime: "19:00",
    endTime: "21:00",
    title: "수현이의 생일파티",
    location: "홍대입구역 2번 출구 앞",
    groupId: "1",
    id: 1,
    color: "#123456",
  };

  return <EventCard scheduleItem={scheduleItem} groupId={scheduleItem.groupId} />;
}

const meta: Meta<typeof EventCard> = {
  title: "Components/EventCard",
  component: EventCard,
  decorators: [
    (Story) => (
      <div style={{ padding: "40px", maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof EventCardStory>;

export const Default: Story = {
  args: {},
};
