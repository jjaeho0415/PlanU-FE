import { useEffect, useRef, useState } from "react";
import styles from "./locationSharing.module.scss";
import BackArrow_Icon from "@assets/Icons/headers/backArrow2.svg?react";
import { createCustomPin, createMarker, initializeMap } from "@utils/drawMap";
import GroupMemberItem from "../components/GroupMemberItem";
import useAuthStore from "@store/useAuthStore";
import { useGetUserInfo } from "@api/user/getUserInfo";
import ArrivalPin from "@assets/images/arrivalPin.png";
import { ReverseGeocoding } from "@utils/geocoding";

const arrivalLocationInfo: ILocationInfoType = {
  location: "홍대입구역 7번출구, 19 신촌로2길 마포구 서울특별시",
  lat: 37.5568905,
  lng: 126.9273886,
};

const groupMemberList: IGetGroupMemberItemType[] = [
  {
    name: "최준혁",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    location: "홍대입구역 7번출구, 19 신촌로2길 마포구 서울특별시",
    lat: 37.5568905,
    lng: 126.9273886,
  },
  {
    name: "이수현",
    profileImage: "https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg",
    location: "서울특별시 마포구 홍익로",
    lat: 37.55372,
    lng: 126.9229984,
  },
  {
    name: "정재호",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    location: "서울특별시 마포구 홍익로",
    lat: 37.553,
    lng: 126.9229984,
  },
  {
    name: "김도하",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    location: "서울특별시 마포구 공덕동 445-16",
    lat: 37.5443027,
    lng: 126.9497249,
  },
  {
    name: "이다은",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    location: "서울특별시 마포구 효창목길",
    lat: 37.5475011,
    lng: 126.9598507,
  },
  {
    name: "이상준",
    profileImage: "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png",
    location: "경기도 파주시 파주읍 봉서리 361-1",
    lat: 37.8496353,
    lng: 126.7894564,
  },
];

const LocationSharingPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { accessToken } = useAuthStore.getState();
  const { data: userInfo } = useGetUserInfo(accessToken);
  const [userCurrentLatLng, setUserCurrentLatLng] = useState<UserLatLngType>();
  const [userCurrentLocationInfo, setUserCurrentLocationInfo] = useState<ILocationInfoType>();
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);


  const handleGroupMemberClick = (lat: number, lng: number) => {
    if (map) {
      map.panTo(new google.maps.LatLng(lat, lng));

      markersRef.current.forEach((marker) => {
        if (marker.position?.lat === lat && marker.position.lng === lng) {
          marker.zIndex = 10;
        }
        else {
          marker.zIndex = 1;
        }
      })
    }
  };

  // 현재 위치가 변할때마다 업데이트
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (
          userCurrentLatLng?.lat === position.coords.latitude &&
          userCurrentLatLng?.lng === position.coords.longitude
        ) {
          return;
        }
        setUserCurrentLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
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
        const formatted_address = await ReverseGeocoding(userCurrentLatLng);
        setUserCurrentLocationInfo({
          lat: userCurrentLatLng.lat,
          lng: userCurrentLatLng.lng,
          location: formatted_address,
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
          { lat: userLocation.lat, lng: userLocation.lng },
          import.meta.env.VITE_GOOGLE_MAP_ID,
          15,
        );

        const pin = await createCustomPin({
          scale: 2,
          glyph: userInfo?.profileImage,
          type: "sharing",
        });
        await createMarker(newMap, { lat: userLocation.lat, lng: userLocation.lng }, pin.element);

        setMap(newMap);

        groupMemberList.forEach(async (member) => {
          const memberPin = await createCustomPin({
            scale: 2.0,
            glyph: member.profileImage,
            type: "sharing",
          });
          const memberMarker = await createMarker(newMap, { lat: member.lat, lng: member.lng }, memberPin.element);
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
            lat: arrivalLocationInfo.lat,
            lng: arrivalLocationInfo.lng,
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
    <div className={styles.mainContainer}>
      <BackArrow_Icon width={30} height={40} className={styles.arrowIcon} />
      <div className={styles.mapContainer} ref={mapRef} />
      <div className={styles.bottomSheetContainer}>
        <div className={styles.line} />
        <div className={styles.text}>친구</div>
        <div className={styles.groupMemberListContainer}>
          {groupMemberList.map((groupMemberInfo) => (
            <GroupMemberItem
              key={groupMemberInfo.name}
              groupMemberItem={groupMemberInfo}
              handleGroupMemberClick={() =>
                handleGroupMemberClick(groupMemberInfo.lat, groupMemberInfo.lng)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSharingPage;
