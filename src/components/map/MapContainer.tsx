import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  x: number;
  y: number;
  place_name: string;
}

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

interface MapContainerProps {
  searchPlace: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ searchPlace }) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const initializeMap = () => {
      const container = document.getElementById('myMap');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      const map = new window.kakao.maps.Map(container, options);

      // 유저의 위치 정보 받아오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const userLatLng = new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            map.setCenter(userLatLng);
            searchPlaces(userLatLng);
          },
          error => {
            // 위치 정보를 받아오지 못할 경우의 처리
            console.error(error);
          }
        );
      } else {
        // Geolocation을 지원하지 않는 경우의 처리
        console.error('Geolocation is not supported.');
      }

      function searchPlaces(center: any) {
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(searchPlace, placesSearchCB, {
          location: center,
          radius: 10000 // 10km를 미터로 표현
        });
      }

      function placesSearchCB(data: Place[], status: string, _pagination: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const markers: Marker[] = [];

          for (let i = 0; i < data.length; i++) {
            const place = data[i];
            console.log(place);
            const markerPosition = {
              lat: place.y,
              lng: place.x
            };
            markers.push({
              position: markerPosition,
              content: place.place_name
            });
            bounds.extend(
              new window.kakao.maps.LatLng(
                markerPosition.lat,
                markerPosition.lng
              )
            );

            displayMarker(place);
          }

          setMarkers(markers);
          map.setBounds(bounds);
        }
      }

      function displayMarker(place: Place) {
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(place.y, place.x)
        });

        // 마커에 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, 'click', function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              '</div>'
          );
          infowindow.open(map, marker);
        });

        // 마커 지도에 추가
        marker.setMap(map);
      }

      // 검색 실행
      if (searchPlace) {
        // 현재 위치를 기준으로 키워드를 검색
        searchPlaces(map.getCenter());
      }
    };

    // Kakao 지도 API 스크립트 로드
    const loadKakaoMapAPI = () => {
      const existingScript = document.getElementById('kakaoMapScript');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'kakaoMapScript';
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`;
        document.head.appendChild(script);

        // 스크립트 로드가 완료된 후에 initializeMap 함수 호출
        script.onload = () => {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        };
      } else {
        initializeMap();
      }
    };

    loadKakaoMapAPI();

    return () => {
      // 언마운트 시 스크립트 제거
      const existingScript = document.getElementById('kakaoMapScript');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [searchPlace]);

  return <div id="myMap" style={{ width: '100%', height: '500px' }}></div>;
};

export default MapContainer;
