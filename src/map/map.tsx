import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  useEffect(() => {
    const apikey: string = process.env.REACT_APP_KAKAO_API_KEY!;
    // 카카오 지도 API 스크립트를 동적으로 생성하고 로드합니다.
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;

    document.head.appendChild(script);

    // 스크립트가 로드되면 지도를 초기화합니다.
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 표시할 div 요소의 id
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 지도의 중심 좌표
          level: 3 // 지도의 확대 레벨
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      });
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '600px' }}></div>;
};

export default Map;
