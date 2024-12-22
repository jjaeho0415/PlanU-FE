import useBottomStore from "@store/useBottomStore";
import { useEffect } from "react";

const MyCalendarPage: React.FC = () => {
  const { bottomIndex, setBottomIndex } = useBottomStore();
  useEffect(() => {
    if (bottomIndex !== 0) {
      setBottomIndex(0);
    }
  }, []);
  return <div>MyCalendarPage</div>;
};

export default MyCalendarPage;
