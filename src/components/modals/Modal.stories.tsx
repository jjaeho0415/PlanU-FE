import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import InviteModal from "./InviteModal";
import catImage from "@assets/images/cat.jpg";

function Modal() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);

  return (
    <>
      <div>
        <h1>Invite Modal</h1>
        <button onClick={() => setIsInviteModalOpen(true)}>초대 수락 모달</button>
      </div>
      {isInviteModalOpen && (
        <InviteModal
          groupId={1}
          groupImage={catImage}
          groupName="V.net"
          setIsInviteModalOpen={setIsInviteModalOpen}
          handleAcceptClick={() => {
            alert("수락되었습니다."), setIsInviteModalOpen(false);
          }}
          handleRejectClick={() => {
            alert("거절되었습니다."), setIsInviteModalOpen(false);
          }}
        />
      )}
      <hr />
    </>
  );
}

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {},
};
