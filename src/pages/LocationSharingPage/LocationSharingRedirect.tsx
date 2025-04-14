import { useWebSocket } from "@store/webSocketProvider"
import { useLocation, useNavigate } from "react-router-dom";

export const LocationSharingRedirect = () => {
    const { isDisconnected } = useWebSocket();
    const navigate = useNavigate();
    const location = useLocation();

    if (isDisconnected && location.pathname.includes("locationSharing")) {
        navigate(-1);
    }

    return null;
}