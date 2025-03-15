import { QueryClient } from "@tanstack/react-query";

export const getSubscribeToSSE = async (accessToken: string, queryClient: QueryClient) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notification/subscribe`, {
      method: "GET",
      headers: {
        Accept: "text/event-stream",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("SSE 연결 실패");
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("SSE 스트림을 읽을 수 없음");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      console.log("SSE 데이터 수신: ", chunk);
      queryClient.invalidateQueries({
        queryKey: ["NOTIFICATION_LIST"],
      });
    }
  } catch (error) {
    console.error("SSE 오류: ", error);
  }
};
