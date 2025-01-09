import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Map from "./Map";

function Map_Story() {
  const selectedLocationInfo: ILocationInfoType = {
    location: "강원도 춘천시 백령로 61번길 4",
    longitude: "37.869159768232095",
    latitude: "127.73680043244275",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <div style={{ width: "351px", height: "436px", border: "1px solid #CB96D9" }}>
        <Map />
      </div>
      <div style={{ width: "351px", height: "436px", border: "1px solid #CB96D9" }}>
        <Map selectedLocationInfo={selectedLocationInfo} />
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
