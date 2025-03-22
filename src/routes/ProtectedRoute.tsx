import useAuthStore from "@store/useAuthStore";
import useBottomStore from "@store/useBottomStore";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  BOTTOM_INDEX_0,
  BOTTOM_INDEX_1,
  BOTTOM_INDEX_2,
  BOTTOM_INDEX_3,
} from "../constants/routingUrl";
import { getSubscribeToSSE } from "@api/notification/getSubscribeToSSE";
import { useQueryClient } from "@tanstack/react-query";
import { useGetNotificationList } from "@api/notification/getNotificationList";
import { postReissue } from "@api/user/postReissue";

const ProtectedRoute = () => {
  const { accessToken, setAccessToken, setIsLogin } = useAuthStore();
  const intervalRef = useRef<number | null>(null);
  const queryClient = useQueryClient();
  const location = useLocation();
  const { setBottomIndex } = useBottomStore();
  const [isReissuing, setIsReissuing] = useState<boolean>(true);

  const { data: notifications, isLoading, error } = useGetNotificationList(accessToken);

  useEffect(() => {
    const reissueToken = async () => {
      if (!accessToken) {
        try {
          const newAccessToken = await postReissue();
          setIsLogin(true);
          setAccessToken(newAccessToken);
        } catch (error) {
          console.error("토큰 재발급 실패: ", error);
        }
      }
      setIsReissuing(false);
    };
    reissueToken();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    // 초기 SSE 구독 실행
    getSubscribeToSSE(accessToken, queryClient);

    // 1시간마다 SSE 자동 재연결
    intervalRef.current = window.setInterval(
      () => {
        console.log("🔄 SSE 자동 재연결 중...");
        getSubscribeToSSE(accessToken, queryClient);
      },
      60 * 60 * 1000,
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [accessToken]);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes(BOTTOM_INDEX_0)) {
      setBottomIndex(0);
    } else if (currentPath.includes(BOTTOM_INDEX_1)) {
      setBottomIndex(1);
    } else if (currentPath.includes(BOTTOM_INDEX_2)) {
      setBottomIndex(2);
    } else if (currentPath.includes(BOTTOM_INDEX_3)) {
      setBottomIndex(3);
    }
  }, [location.pathname]);

  if (isReissuing) {
    return null;
  }

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={{ notifications, isLoading, error }} />;
};

export default ProtectedRoute;
