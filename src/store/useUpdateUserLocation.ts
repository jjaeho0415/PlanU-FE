import { useEffect } from "react";
import useUserLocation from "@store/useUserLocation";
import useAuthStore from "@store/useAuthStore";
import apiRoutes from "@api/apiRoutes";
import { Client } from "@stomp/stompjs";

const useUpdateUserLocation = (groupId: string, scheduleId: string, stompClient: Client | null) => {
  const userCurrentLatLng = useUserLocation();
  const { accessToken } = useAuthStore.getState();

  useEffect(() => {
    if (!userCurrentLatLng || !groupId || !scheduleId || !accessToken) {
      return;
    }

    const sendLocationUpdate = () => {
      stompClient?.publish({
        destination: `${import.meta.env.VITE_API_URL}${apiRoutes.pubLocation}/${groupId}/${scheduleId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userCurrentLatLng),
      });
    };
    if (stompClient && stompClient.connected) {
      sendLocationUpdate();
    }
  }, [userCurrentLatLng, stompClient, groupId, scheduleId, accessToken]);
};

export default useUpdateUserLocation;
