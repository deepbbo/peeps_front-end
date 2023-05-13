import React, { useEffect } from 'react';

// kakao를 글로벌로 선언해주어야 앱이 인식할 수 있음
declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  useEffect(() => {
    window.kakao.maps.load(() => {
      let mapContainer = document.getElementById('map'); //지도를 담을 영역
      let mapOptions = {
        //지도 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
        level: 3 //지도의 레벨(확대, 축소 정도)
      };
      let map = new window.kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default Map;
