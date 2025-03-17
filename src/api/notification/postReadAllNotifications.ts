import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postReadAllNotifications = async (authorization: string) => {
    const response: IResponseType = await api.post({
        endpoint: apiRoutes.readAllNotifications,
        authorization
    })
    return response;
}

export const usePostReadAllNotifications = (authorization: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => postReadAllNotifications(authorization),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["NOTIFICATION_LIST"]
            })
        }
    })
}