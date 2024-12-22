import useBottomStore from "@store/useBottomStore";
import { useEffect } from "react";

const GroupListPage: React.FC = () => {
  const { bottomIndex, setBottomIndex } = useBottomStore();
  useEffect(() => {
    if (bottomIndex !== 1) {
      setBottomIndex(1);
    }
  }, []);
  return <div>GroupListPage</div>;
};

export default GroupListPage;
