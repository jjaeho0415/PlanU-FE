import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BottomState {
  bottomIndex: number;
  setBottomIndex: (BottomState: number) => void;
  clearBottomState: () => void;
}

const useBottomStore = create<BottomState>(
  persist(
    (set) => ({
      bottomIndex: 0,
      setBottomIndex: (bottomIndex) => set({ bottomIndex }),
      clearBottomState: () =>
        set(() => {
          return { bottomIndex: 0 };
        }),
    }),
    {
      name: "bottom-state",
      onRehydrateStorage: () => (state) => {
        state?.clearBottomState && localStorage.removeItem("bottom-state");
      },
    },
  ) as (set: (fn: (state: BottomState) => BottomState) => void) => BottomState,
);

export default useBottomStore;
