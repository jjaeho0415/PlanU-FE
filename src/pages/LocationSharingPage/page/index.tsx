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

const arrivalLocationInfo: IArrivalLocationInfo = {
  location: "홍대입구역 7번출구, 19 신촌로2길 마포구 서울특별시",
  startTime: "16:59",
  latitude: 37.5568905,
  longitude: 126.9273886,
};

const groupMemberList: IGetGroupMemberLocationResponseType[] = [
  {
    name: "최준혁",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    username: "chlwnsgur",
    latitude: 37.5568905,
    longitude: 126.9273886,
  },
  {
    name: "이수현",
    username: "dltngus",
    profileImage: "https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg",
    latitude: 37.55372,
    longitude: 126.9229984,
  },
  {
    name: "정재호",
    username: "wjdwogh",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    latitude: 37.553,
    longitude: 126.9229984,
  },
  {
    name: "김도하",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    latitude: 37.5443027,
    longitude: 126.9497249,
    username: "rlaehgk",
  },
  {
    name: "이다은",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    username: "dlekdms",
    latitude: 37.5475011,
    longitude: 126.9598507,
  },
  {
    name: "이상준",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    latitude: 37.8496353,
    longitude: 126.7894564,
    username: "dltkdwns",
  },
];

const LocationSharingPage = () => {
  const { groupId, scheduleId } = useParams<{ groupId: string; scheduleId: string }>();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { accessToken } = useAuthStore.getState();
  const { data: userInfo } = useGetUserInfo(accessToken);
  const [userCurrentLatLng, setUserCurrentLatLng] = useState<UserLatLngType>();
  const [userCurrentLocationInfo, setUserCurrentLocationInfo] = useState<UserLatLngType>();
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);
  const startY = useRef<number>(0);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const { stompClient, connectWebSocket } = useWebSocket();
  // const [groupMemberList, setGroupMemberList] = useState<IGetGroupMemberLocationResponseType[]>([])

  useEffect(() => {
    if (!arrivalLocationInfo.startTime) {
      return;
    }

    connectWebSocket(arrivalLocationInfo.startTime, accessToken);

    if (!stompClient || !groupId) {
      return;
    }

    // const subscription = stompClient.subscribe(`/sub/location/groups/${groupId}`, (message) => {
    //   const updatedLocation: IGetGroupMemberLocationResponseType = JSON.parse(message.body);

    //   // 기존에 동일한 username이 있으면 업데이트, 없으면 새로운 멤버 추가
    //   setGroupMemberList((prev) => {
    //     const exists = prev.some((member) => member.username === updatedLocation.username);
    //     return exists
    //       ? prev.map((member) =>
    //           member.username === updatedLocation.username ? updatedLocation : member,
    //         )
    //       : [...prev, updatedLocation];
    //   });
    // });
  }, [accessToken, groupId, scheduleId, arrivalLocationInfo, stompClient]);

  // PC/데스크탑 버전
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

  // 모바일 버전
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

  const handleGroupMemberClick = (clickedMember: IGetGroupMemberLocationResponseType) => {
    if (map) {
      map.panTo(new google.maps.LatLng(clickedMember.latitude, clickedMember.longitude));

      markersRef.current.forEach(async (marker) => {
        const isClickedMarker =
          marker.position?.lat === clickedMember.latitude &&
          marker.position.lng === clickedMember.longitude;

        // 클릭된 마커만 스타일 변경
        if (isClickedMarker) {
          marker.content = await (
            await createCustomPin({
              scale: 2.0,
              glyph: clickedMember.profileImage,
              type: "sharing",
              isClicked: true,
            })
          ).element;
          marker.position = marker.position;
          marker.zIndex = 10;
          setSelectedName(clickedMember.name);
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

  // 현재 위치가 변할때마다 업데이트
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (
          userCurrentLatLng?.latitude === position.coords.latitude &&
          userCurrentLatLng?.longitude === position.coords.longitude
        ) {
          return;
        }
        setUserCurrentLatLng({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user's location: ", error);
      },
    );
  }, [userCurrentLatLng]);

  // 자신의 현재 위치 정보(경도, 위도)로 위치정보(한글) 변환
  useEffect(() => {
    const reverseGeocoding = async () => {
      if (userCurrentLatLng) {
        setUserCurrentLocationInfo({
          latitude: userCurrentLatLng.latitude,
          longitude: userCurrentLatLng.longitude,
        });
      }
    };
    reverseGeocoding();
  }, [userCurrentLatLng]);

  useEffect(() => {
    // 백엔드로 사용자의 현재위치 보내는 로직 작성해야함(몇초마다 보내주는걸로 debounce나 소켓 사용해야할듯)
  }, [userCurrentLocationInfo]);

  // 그룹 멤버들의 위치와 도착장소를 핀으로 보여줌
  // 처음 맵의 중심은 자신의 현재 위치로 지정
  useEffect(() => {
    const initMap = async () => {
      if (!userInfo || !mapRef.current) {
        return;
      }

      const userLocation = groupMemberList.find((member) => member.name === userInfo.name);

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
        await createMarker(
          newMap,
          { lat: userLocation.latitude, lng: userLocation.longitude },
          pin.element,
        );

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
  }, [userInfo, mapRef.current]);

  return (
    <>
      <LocationSharingRedirect/>
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
          {groupMemberList.map((groupMemberInfo) => (
            <GroupMemberItem
              key={groupMemberInfo.name}
              groupMemberItem={groupMemberInfo}
              handleGroupMemberClick={() => handleGroupMemberClick(groupMemberInfo)}
              arrivalLocationInfo={arrivalLocationInfo}
              selectedName={selectedName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LocationSharingPage;
