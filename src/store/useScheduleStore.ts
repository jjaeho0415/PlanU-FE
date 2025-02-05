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
  locationName: string;
  setLocationName: (info: string) => void;
  participants: IGetMemberType[];
  setParticipants: (info: IGetMemberType[]) => void;
  unregisteredParticipants: string[];
  setUnregisteredParticipants: (info: string[]) => void;
  note: string;
  setNote: (info: string) => void;
}

const useScheduleStore = create<IScheduleInfo>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
  color: "",
  setColor: (color) => set({ color }),
  isAllDay: false,
  setIsAllDay: (isAllDay) => set({ isAllDay }),
  startDate: new Date(),
  setStartDate: (startDate) => set({ startDate }),
  endDate: new Date(),
  setEndDate: (endDate) => set({ endDate }),
  locationName: "",
  setLocationName: (locationName) => set({ locationName }),
  participants: [],
  setParticipants: (participants) => set({ participants }),
  unregisteredParticipants: [],
  setUnregisteredParticipants: (unregistered) => set({ unregisteredParticipants: unregistered }),
  note: "",
  setNote: (note) => set({ note }),
}));

export default useScheduleStore;
