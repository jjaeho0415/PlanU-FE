import useBottomStore from "@store/useBottomStore";
import { useEffect } from "react";

const ChatListPage = () => {
  const { bottomIndex, setBottomIndex } = useBottomStore();
  useEffect(() => {
    if (bottomIndex !== 2) {
      setBottomIndex(2);
    }
  }, []);
  return <div>ChatListPage</div>;
};

export default ChatListPage;
