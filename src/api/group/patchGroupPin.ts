import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const patchGroupPin = async (groupId: string, authorization: string) => {
    const response: ResponseType = await api.patch({
        endpoint: `${apiRoutes.pin}/${groupId}`,
        authorization
    })
    return response
}

export const usePatchGroupPin = (groupId: string, authorization: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => patchGroupPin(groupId, authorization),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["GROUP_INFO"],
            })
        },
        onError: (error) => alert(error.message)
    })
}