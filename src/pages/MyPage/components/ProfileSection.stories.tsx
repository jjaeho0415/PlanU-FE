import { Meta, StoryObj } from "@storybook/react";
import ProfileSection from "./ProfileSection";

const meta: Meta<typeof ProfileSection> = {
  title: "Components/ProfileSection",
  component: ProfileSection,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileSection>;

export const Default: Story = {
  args: {
    name: "이수현",
    username: "su_velyy_",
    email: "suhyun2116@gmail.com",
    birthDate: "2003.02.19",
    profileImage: undefined,
  },
};
