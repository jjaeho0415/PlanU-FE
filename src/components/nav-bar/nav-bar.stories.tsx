import { Meta, StoryObj } from "@storybook/react";
import BottomNavBar from "./BottomNavBar";

function NavBar() {
  
  return (
    <>
      <div>
        <h1>BottomNavBar</h1>
        <BottomNavBar />
      </div>
      <hr />
    </>
  );
}

const meta: Meta<typeof NavBar> = {
  title: "NavBar",
  component: NavBar,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {},
};
