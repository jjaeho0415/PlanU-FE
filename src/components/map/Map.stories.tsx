import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Map from "./Map";

function Map_Story() {
  // const selectedLocationInfo: UserLatLngType = {
  //   lat: 37.557169,
  //   lng: 126.923834,
  // };
  const notSelectedLocationInfo: UserLatLngType = {
    lng: 0,
    lat: 0,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      {/* <div>선택된 위치가 있을때(홍대입구역 2번출구)</div>
      <div style={{ width: "351px", height: "201px", border: "1px solid #CB96D9" }}>
        <Map latLng={selectedLocationInfo} />
      </div> */}
      <div>선택된 위치가 없을때(현재위치)</div>
      <div style={{ width: "351px", height: "201px", border: "1px solid #CB96D9" }}>
        <Map latLng={notSelectedLocationInfo} />
      </div>
    </div>
  );
}

const meta: Meta<typeof Map_Story> = {
  title: "Map_Story",
  component: Map_Story,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Map_Story>;

export const Default: Story = {
  args: {},
};
