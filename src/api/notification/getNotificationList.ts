import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useQuery } from "@tanstack/react-query";

const getNotificationList = async (authorization: string) => {
    const response: IGetNotificationListResponseBodyType = await api.get({
        endpoint: apiRoutes.notificationList,
        authorization
    })
    return response;
}

export const useGetNotificationList = (authorization: string) => {
    return useQuery({
        queryKey: ["NOTIFICATION_LIST"],
        queryFn: () => getNotificationList(authorization),
        enabled: !!authorization,
    })
}