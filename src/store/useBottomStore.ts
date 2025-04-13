import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BottomState {
  bottomIndex: number;
  setBottomIndex: (BottomState: number) => void;
  clearBottomState: () => void;
}

const useBottomStore = create<BottomState>()(
  persist(
    (set) => ({
      bottomIndex: 0,
      setBottomIndex: (bottomIndex) => set({ bottomIndex }),
      clearBottomState: () => {
        set({ bottomIndex: 0 });
        localStorage.removeItem("bottom-state");
      },
    }),
    {
      name: "bottom-state",
    },
  ),
);

export default useBottomStore;
