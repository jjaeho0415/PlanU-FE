import { create } from "zustand";

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
  participants: IGetMemberType[];
  setParticipants: (info: IGetMemberType[]) => void;
  unregisteredParticipants: string[];
  setUnregisteredParticipants: (info: string[]) => void;
  note: string;
  setNote: (info: string) => void;
  reset: () => void;
}
const useScheduleStore = create<IScheduleInfo>((set) => {
  const initialState = {
    title: "",
    color: "",
    isAllDay: false,
    startDate: new Date(),
    endDate: new Date(),
    participants: [],
    unregisteredParticipants: [],
    note: "",
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
    setNote: (note) => set({ note }),

    // 초기화할 때 setter 함수들은 유지하면서 상태만 초기 상태로 변경
    reset: () => set(() => ({ ...initialState })),
  };
});

export default useScheduleStore;
