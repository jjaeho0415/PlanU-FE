import { Meta, StoryObj } from "@storybook/react";
import EventCard from "./EventCard";

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

type Story = StoryObj<typeof EventCard>;

export const Default: Story = {
  args: {
    time: "19:00 ~ 20:00",
    title: "수현이의 생일파티",
    location: "홍대입구역 2번 출구 앞",
  },
};
