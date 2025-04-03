import { useEffect, useRef, useState } from "react";
import styles from "./locationSharing.module.scss";
import BackArrow_Icon from "@assets/Icons/headers/backArrow2.svg?react";
import { createCustomPin, createMarker, initializeMap } from "@utils/drawMap";
import GroupMemberItem from "../components/GroupMemberItem";
import useAuthStore from "@store/useAuthStore";
import { useGetUserInfo } from "@api/user/getUserInfo";
import ArrivalPin from "@assets/images/arrivalPin.png";
import { useNavigate, useParams } from "react-router-dom";
import { useWebSocket } from "@store/webSocketProvider";
import { LocationSharingRedirect } from "../LocationSharingRedirect";
import useUserLocation from "@store/useUserLocation";

const arrivalLocationInfo: IArrivalLocationInfo = {
  location: "홍대입구역 7번출구, 19 신촌로2길 마포구 서울특별시",
  startTime: "16:51",
  latitude: 37.5568905,
  longitude: 126.9273886,
};

const LocationSharingPage = () => {
  const { groupId, scheduleId } = useParams<{ groupId: string; scheduleId: string }>();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { accessToken } = useAuthStore.getState();
  const { data: userInfo } = useGetUserInfo(accessToken);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);
  const startY = useRef<number>(0);
  const { stompClient, connectWebSocket, isConnected } = useWebSocket();
  const [groupMemberList, setGroupMemberList] = useState<IMemberLocationType[]>([]);
  const userCurrentLatLng = useUserLocation();
  const [selectedUserName, setSelectedUserName] = useState<string>("")

  // 웹소켓 연결
  useEffect(() => {
    if (!arrivalLocationInfo.startTime) {
      return;
    }

    connectWebSocket(arrivalLocationInfo.startTime, accessToken);
  }, [accessToken, arrivalLocationInfo]);

  // 실시간 위치 정보 구독
  useEffect(() => {
    if (!groupId || !scheduleId) {
      console.warn("❌ groupId 또는 scheduleId가 없음, 구독 중단");
      return;
    }
    if (isConnected) {
      stompClient?.subscribe(
        `/sub/location/groups/${groupId}/${scheduleId}`,
        (message) => {
          if (!message?.body) {
            console.warn("⚠️ 빈 메시지가 수신됨");
            return;
          }

          try {
            const response: IGetGroupMemberLocationResponseType = JSON.parse(message.body);

            setGroupMemberList((prev) => {
              const updatedLocation: IMemberLocationType[] = response.groupMemberLocations;

              const updatedMembers = prev.map((member) => {
                const newLocation = updatedLocation.find((loc) => loc.username === member.username);
                return newLocation ? newLocation : member;
              });

              const newMembers = updatedLocation.filter(
                (loc) => !prev.some((member) => member.username === loc.username),
              );

              return [...updatedMembers, ...newMembers];
            });
          } catch (error) {
            console.error("❌ JSON 파싱 에러:", error);
          }
        },
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );
    }
  }, [accessToken, groupId, scheduleId, isConnected]);

  useEffect(() => {
    // 현재 위치 및 변하는 위치 정보 감지 후 위치 변동 시 발행
    if (!userCurrentLatLng || !groupId || !scheduleId || !accessToken) {
      return;
    }
    const sendLocationUpdate = () => {
      stompClient?.publish({
        destination: `/pub/location/groups/${groupId}/${scheduleId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userCurrentLatLng),
      });
    };
    if (stompClient && stompClient.connected && isConnected) {
      sendLocationUpdate();
    }
  }, [isConnected, userCurrentLatLng, stompClient, groupId, scheduleId, accessToken]);

  useEffect(() => {
    console.log("Updated groupMemberList:", groupMemberList);
  }, [groupMemberList]);

  // PC/데스크탑 버전 바텀시트
  const handleMouseMove = (e: MouseEvent) => {
    const deltaY = e.clientY - startY.current;

    if (deltaY > 50) {
      setIsBottomSheetOpen(false);
    } else if (deltaY < -50) {
      setIsBottomSheetOpen(true);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // 모바일 버전 바텀시트
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - startY.current;
    if (deltaY > 50) {
      setIsBottomSheetOpen(false);
    } else if (deltaY < -50) {
      setIsBottomSheetOpen(true);
    }
  };

  const handleGroupMemberClick = (clickedMember: IMemberLocationType) => {
    if (map) {
      map.panTo(new google.maps.LatLng(clickedMember.latitude, clickedMember.longitude));

      markersRef.current.forEach(async (marker) => {
        const isClickedMarker =
          marker.position?.lat === clickedMember.latitude &&
          marker.position.lng === clickedMember.longitude;

        // 클릭된 마커만 스타일 변경
        if (isClickedMarker) {
          marker.content = (
            await createCustomPin({
              scale: 2.0,
              glyph: clickedMember.profileImage,
              type: "sharing",
              isClicked: true,
            })
          ).element;
          marker.position = marker.position;
          marker.zIndex = 10;
          setSelectedUserName(clickedMember.username);
        } else {
          const imgElement =
            marker.content instanceof HTMLElement ? marker.content.querySelector("img") : null;

          if (imgElement) {
            const originalPin = await createCustomPin({
              scale: 2.0,
              glyph: imgElement.getAttribute("src") || "",
              type: "sharing",
              isClicked: false,
            });
            marker.content = originalPin.element;
            marker.zIndex = 1;
          }
        }
      });
    }
  };

  // 그룹 멤버들의 위치와 도착장소를 핀으로 보여줌
  // 처음 맵의 중심은 자신의 현재 위치로 지정
  useEffect(() => {
    const initMap = async () => {
      if (!userInfo || !mapRef.current) {
        return;
      }

      let userLocation = groupMemberList.find((member) => member.username === userInfo.username);

      if (!userLocation && userCurrentLatLng) {
        console.warn("그룹 멤버 리스트에서 사용자 위치를 찾을 수 없어, 현재 위치를 사용합니다.");
        userLocation = {
          name: userInfo.name,
          username: userInfo.username,
          latitude: userCurrentLatLng.latitude,
          longitude: userCurrentLatLng.longitude,
          profileImage: userInfo.profileImage,
        };
      }

      if (!userLocation) {
        console.error("User not found in group member list");
        return;
      }

      try {
        const newMap = await initializeMap(
          mapRef.current,
          { lat: userLocation.latitude, lng: userLocation.longitude },
          import.meta.env.VITE_GOOGLE_MAP_ID,
          15,
        );

        const pin = await createCustomPin({
          scale: 2,
          glyph: userInfo?.profileImage,
          type: "sharing",
        });
         
        const myPin = await createMarker(
          newMap,
          { lat: userLocation.latitude, lng: userLocation.longitude },
          pin.element,
        );
        myPin.zIndex = 10;

        setMap(newMap);

        groupMemberList.forEach(async (member) => {
          const memberPin = await createCustomPin({
            scale: 2.0,
            glyph: member.profileImage,
            type: "sharing",
          });
          const memberMarker = await createMarker(
            newMap,
            { lat: member.latitude, lng: member.longitude },
            memberPin.element,
          );
          markersRef.current.push(memberMarker);
          memberMarker.zIndex = 1;
        });

        const arrivalPin = await createCustomPin({
          scale: 2.5,
          glyph: ArrivalPin,
          type: "arrivalPin",
        });

        const arrivalMarker = await createMarker(
          newMap,
          {
            lat: arrivalLocationInfo.latitude,
            lng: arrivalLocationInfo.longitude,
          },
          arrivalPin.element,
        );
        arrivalMarker.zIndex = 20;
      } catch (error) {
        console.error("Error initializing map: ", error);
      }
    };

    initMap();
  }, [userInfo, mapRef.current, groupMemberList]);

  return (
    <>
      <LocationSharingRedirect />
      <div className={styles.mainContainer}>
        <BackArrow_Icon
          width={30}
          height={40}
          className={styles.arrowIcon}
          onClick={() => navigate(-1)}
        />
        <div className={styles.mapContainer} ref={mapRef} />
      </div>
      <div
        className={`${styles.bottomSheetContainer} ${isBottomSheetOpen ? styles.open : ""}`}
        ref={bottomSheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.line} />
        <div className={styles.text}>친구</div>
        <div className={styles.groupMemberListContainer}>
          {groupMemberList.length !== 0 ? (
            groupMemberList.map((groupMemberInfo) => (
              <GroupMemberItem
                key={groupMemberInfo.username}
                groupMemberItem={groupMemberInfo}
                handleGroupMemberClick={() => {
                  handleGroupMemberClick(groupMemberInfo);
                }}
                arrivalLocationInfo={arrivalLocationInfo}
                selectedUserName={selectedUserName}
              />
            ))
          ) : (
            <div className={styles.error}>Server Error: 그룹원 목록 불러오기 실패</div>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationSharingPage;
