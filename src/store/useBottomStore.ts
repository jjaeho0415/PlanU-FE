import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BottomState {
    bottomIndex: number;
    setBottomIndex: (BottomState: number) => void;
}

const useBottomStore = create<BottomState>(
  persist(
    (set) => ({
      bottomIndex: 0,
        setBottomIndex: (bottomIndex) => set({bottomIndex}),
     
    }),
    { name: "bottom-state" },
  ) as (set: (fn: (state: BottomState) => BottomState) => void) => BottomState,
);

export default useBottomStore;
