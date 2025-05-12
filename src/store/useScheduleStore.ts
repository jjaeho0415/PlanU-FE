import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IScheduleInfo {
  title: string;
  setTitle: (info: string) => void;
  color: string;
  setColor: (info: string) => void;
  isAllDay: boolean;
  setIsAllDay: (info: boolean) => void;
  startDate: Date;
  setStartDate: (info: Date) => void;
  endDate: Date;
  setEndDate: (info: Date) => void;
  participants: IScheduleMemberType[];
  setParticipants: (info: IScheduleMemberType[]) => void;
  unregisteredParticipants: string[];
  setUnregisteredParticipants: (info: string[]) => void;
  memo: string;
  setMemo: (info: string) => void;
  resetScheduleState: () => void;
}
const useScheduleStore = create<IScheduleInfo>()((set) => {
  const initialState = {
    title: "",
    color: "#F6B6CA",
    isAllDay: false,
    startDate: new Date(),
    endDate: new Date(),
    participants: [],
    unregisteredParticipants: [],
    memo: "",
  };

  return {
    ...initialState,
    setTitle: (title) => set({ title }),
    setColor: (color) => set({ color }),
    setIsAllDay: (isAllDay) => set({ isAllDay }),
    setStartDate: (startDate) => set({ startDate }),
    setEndDate: (endDate) => set({ endDate }),
    setParticipants: (participants) => set({ participants }),
    setUnregisteredParticipants: (unregistered) => set({ unregisteredParticipants: unregistered }),
    setMemo: (memo) => set({ memo }),

    resetScheduleState: () => set(() => ({ ...initialState })),
  };
});

export default useScheduleStore;
