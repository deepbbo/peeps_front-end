import React, { useEffect } from 'react';

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

interface MapContainerProps {
  searchPlace: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ searchPlace }) => {
  useEffect(() => {
    // 최초 위치 설정
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

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data: Place[], status: string, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
        }
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
      ps.keywordSearch(searchPlace, placesSearchCB, { useMapBounds: true });
    }
  }, [searchPlace]);

  return <div id="myMap" style={{ width: '500px', height: '1000px' }}></div>;
};

export default MapContainer;
