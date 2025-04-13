import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useMutation } from "@tanstack/react-query";

const postUserLocationUpdate = async (authorization: string, body: UserLatLngType) => {
    const response:IResponseType = await api.post({
        endpoint: apiRoutes.updateUserLocation,
        authorization,
        body
    });
    return response;
}

export const usePostUserLocationUpdate = (authorization: string) => {
    return useMutation({
        mutationFn: (body: UserLatLngType) => postUserLocationUpdate(authorization, body)
    })
}