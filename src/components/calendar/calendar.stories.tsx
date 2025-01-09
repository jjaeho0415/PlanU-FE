import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";

function Calendar_Story() {
  const myPossibleDates = ["2024-12-29", "2025-01-03","2025-01-04", "2025-02-01"];
  const [availableDates, setAvailableDates] = useState<string[]>(myPossibleDates);
  const groupPossibleDates:IGetGroupPossibleScheduleType[] = [
    {
      date: "2024-12-31",
      possibleRatio: 25,
    },
    {
      date: "2025-01-12",
      possibleRatio: 50,
    },
    {
      date: "2025-01-14",
      possibleRatio: 75,
    },
    {
      date: "2025-02-01",
      possibleRatio: 100,
    },

  ]

  useEffect(() => {
    console.log("availableDates: ", availableDates)
  },[availableDates])
  const schedule: IGetScheduleType[] = [
    {
      date: "2024-12-31",
      isSchedule: true,
      isBirthday: false,
    },
    {
      date: "2025-01-03",
      isSchedule: false,
      isBirthday: false,
    },
    {
      date: "2025-01-14",
      isSchedule: false,
      isBirthday: true,
    },
    {
      date: "2025-02-01",
      isSchedule: true,
      isBirthday: true,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        backgroundColor: "#F4E5FF",
        width: "500px",
        height: "1200px",
        padding: "30px",
      }}
    >
      <div>
        <div>개인/그룹/친구 달력</div>
        <Calendar type="view" scheduleData={schedule} />
      </div>
      <div>
        <div>나의 달력 - 가능한 날짜 선택</div>
        <Calendar
          type="possible"
          availableDates={availableDates}
          setAvailableDates={setAvailableDates}
          scheduleData={schedule}
        />
      </div>
      <div>
        <div>그룹 달력 - 가능한 날짜 보기</div>
        <Calendar
          type="groupPossible"
          scheduleData={schedule}
          groupAvailableDates={groupPossibleDates}
        />
      </div>
    </div>
  );
}

const meta: Meta<typeof Calendar_Story> = {
  title: "Calendar_Story",
  component: Calendar_Story,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Calendar_Story>;

export const Default: Story = {
  args: {},
};
