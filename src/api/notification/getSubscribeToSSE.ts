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
      if (chunk.startsWith("data:")) {
        const jsonString = chunk.slice(5).trim();
        try {
          const parsedData = JSON.parse(jsonString);
          console.log("parsedData: ", parsedData);

          if (parsedData.eventType === "FRIEND_REQUEST") {
            queryClient.invalidateQueries({
              queryKey: ["RECEIVE_FRIEND_LIST"],
            });
          }

          if (parsedData.eventType === "FRIEND_ACCEPT") {
            ["FRIEND_LIST", "REQUEST_FRIEND_LIST"].forEach((key) =>
              queryClient.invalidateQueries({
                queryKey: [key],
              }),
            );
          }

          if (["GROUP_EXPEL", "GROUP_DELETE"].includes(parsedData.eventType)) {
            queryClient.invalidateQueries({
              queryKey: ["GROUP_LIST"],
            });
          }

          if (parsedData.eventType === "GROUP_ACCEPT") {
            ["GROUP_LIST", "GROUP_INVITE_LIST"].forEach((key) =>
              queryClient.invalidateQueries({
                queryKey: [key],
              }),
            );
          }

          if (parsedData.eventType === "GROUP_INVITE") {
            queryClient.invalidateQueries({
              queryKey: ["GROUP_INVITE_LIST"],
            });
          }

          if (["GROUP_SCHEDULE_CREATE", "GROUP_SCHEDULE_DELETE"].includes(parsedData.eventType)) {
            ["GROUP_CALENDAR_SCHEDULES", "GROUP_CHECK_EVENTS", "GROUP_SCHEDULE_LIST"].forEach(
              (key) =>
                queryClient.invalidateQueries({
                  queryKey: [key],
                }),
            );
          }

          if (parsedData.eventType === "COMMENT") {
            queryClient.invalidateQueries({
              queryKey: ["COMMENT_LIST"],
            });
          }

          queryClient.invalidateQueries({
            queryKey: ["NOTIFICATION_LIST"],
          });
        } catch (error) {
          console.error("JSON 파싱 오류: ", error);
        }
      }
    }
  } catch (error) {
      console.log("SSE 연결실패")
    console.error("SSE 오류: ", error);
  }
};
