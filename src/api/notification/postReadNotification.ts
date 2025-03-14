import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useMutation } from "@tanstack/react-query";

const postReadNotification = async (authorization: string, notificationId: number) => {
    const response = api.post<IResponseType>({
        endpoint: `${apiRoutes.readNotification}/${notificationId}`,
        authorization
    })
    return response;
}

export const usePostReadNotification = (authorization: string) => {
    return useMutation({
        mutationFn: (notificationId: number) => postReadNotification(authorization, notificationId),
    })
}