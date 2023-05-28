import React, { useEffect, useState, useRef } from 'react';
import style from 'styled-components';
import { useDispatch } from 'react-redux';
import { changePlace } from '../../redux/placeSlice';
import { useNavigate } from 'react-router-dom';
import { changeHeader } from '../../redux/headerSlice';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  place_name: string;
  category_name: string;
  address_name: string;
  phone: string;
  x: number;
  y: number;
}

const MapContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [map, setMap] = useState<any>(null);
  const [center, setCenter] = useState<any>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [markers, setMarkers] = useState<any>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [address, setAddress] = useState<string>(''); // Added state for the address
  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadMap = () => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978),
            level: 5
          };
          const newMap = new window.kakao.maps.Map(container, options);

          // 유저의 위치 정보 받아오기
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                const userLatLng = new window.kakao.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude
                );

                newMap.setCenter(userLatLng);
              },
              error => {
                // 위치 정보를 받아오지 못할 경우의 처리
                console.error(error);
              }
            );
          } else {
            // Geolocation을 지원하지 않는 경우의 처리
            console.error('위치 정보를 가져올 수 없습니다.');
          }
          setMap(newMap); // map 상태 업데이트
        });
      };

      document.body.appendChild(script);
    };

    loadMap();
  }, []);

  useEffect(() => {
    const handleCenterChanged = async () => {
      if (map) {
        const bounds = map.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        const centerLng = (ne?.getLng() + sw?.getLng()) / 2;
        const centerLat = (ne?.getLat() + sw?.getLat()) / 2;

        const newCenter = { lat: centerLat, lng: centerLng };
        setCenter(newCenter);

        const geocoder = new window.kakao.maps.services.Geocoder();

        const centerAddress: any = await new Promise(resolve => {
          geocoder.coord2RegionCode(
            centerLng,
            centerLat,
            (result: any[], status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address_name = result[0].address_name.split(' ');
                console.log(address_name[1]);
              }
              resolve(result);
            }
          );
        });
        // console.log(centerAddress);
        const address_name = centerAddress[0].address_name.split(' ')[1];

        console.log(address_name);
        dispatch(changeHeader(address_name));
      }
    };

    if (map) {
      map.addListener('center_changed', handleCenterChanged);
    }

    return () => {
      if (map) {
        map.removeListener('center_changed', handleCenterChanged);
      }
    };
  }, [map]);

  useEffect(() => {
    if (center && map) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      const callback = (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setAddress(result[0].address_name);
        } else {
          setAddress('');
        }
      };

      const { lat, lng } = center;
      geocoder.coord2Address(lng, lat, callback);
    }
  }, [center, map]);

  const handleReturnToCurrentLocation = () => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userLatLng = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          map.setCenter(userLatLng);
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  const handleSearch = (keyword: string) => {
    if (map) {
      const ps = new window.kakao.maps.services.Places();

      const bounds = map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      const centerLng = (ne?.getLng() + sw?.getLng()) / 2;
      const centerLat = (ne?.getLat() + sw?.getLat()) / 2;

      const searchOptions = {
        location: new window.kakao.maps.LatLng(centerLat, centerLng),
        radius: 5000
      };

      ps.keywordSearch(
        keyword,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const places = result.filter((place: any) => {
              const { x, y } = place;

              return (
                x >= sw?.getLng() &&
                x <= ne?.getLng() &&
                y >= sw?.getLat() &&
                y <= ne?.getLat()
              );
            });

            if (places.length > 0) {
              const firstPlace = places[0];
              const { x, y } = firstPlace;

              const position = new window.kakao.maps.LatLng(y, x);

              map.panTo(position);

              markers.forEach((marker: any) => {
                marker.setMap(null);
              });

              const newMarkers = places.map((place: any) => {
                console.log(place);
                const { x, y } = place;
                const markerPosition = new window.kakao.maps.LatLng(y, x);
                const marker = new window.kakao.maps.Marker({
                  position: markerPosition
                });

                window.kakao.maps.event.addListener(marker, 'click', () => {
                  handleMarkerClick(place);
                });

                marker.setMap(map);
                return marker;
              });

              setMarkers(newMarkers);

              // 마커가 1개 이상일 때 지도의 줌 레벨 조정
              if (places.length > 1) {
                const markerBounds = new window.kakao.maps.LatLngBounds();
                places.forEach((place: Place) => {
                  markerBounds.extend(
                    new window.kakao.maps.LatLng(place.y, place.x)
                  );
                });
                map.setBounds(markerBounds);
              }
            } else {
              setModalOpen(true);
            }
          } else {
            console.error('장소 검색에 실패하였습니다.');
          }
        },
        searchOptions
      );
    }
  };

  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlace(null);
  };

  const handleMapClick = (e: any) => {
    if (selectedPlace) {
      const { place_name, category_name, address_name, phone } = selectedPlace; // x와 y 제거
      dispatch(changePlace({ place_name, category_name, address_name, phone })); // changePlace 액션 디스패치하여 Redux의 place 값을 저장
    }

    navigate(`/api/v1/review/location/${selectedPlace.id}`);
  };

  return (
    <MapWrapper>
      <div
        id="map"
        style={{ width: '100%', height: 'calc(100vh - 156px)' }}
      ></div>

      <Buttons className="buttons">
        <button onClick={() => handleSearch('동물병원')}>동물병원</button>
        <button onClick={() => handleSearch('공원')}>공원</button>
      </Buttons>

      <MyLocation onClick={handleReturnToCurrentLocation}>
        현재위치로
      </MyLocation>

      {modalOpen && selectedPlace && (
        <Modal onClick={handleMapClick}>
          <div className="modal-content" ref={modalRef}>
            <h2>{selectedPlace.place_name}</h2>
            <p>주소: {selectedPlace.address_name}</p>
            <p>카테고리: {selectedPlace.category_name}</p>
            <p>전화번호: {selectedPlace.phone}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </Modal>
      )}
    </MapWrapper>
  );
};

export default MapContainer;

const MapWrapper = style.div`
  position: relative;
`;

const Buttons = style.div`  
  position: absolute;
  top: 15px;
  left: 20px;
  z-index: 1;

  button {
    font-size: 15px;
    color: #fff;
    margin-right: 10px;
    padding: 10px;
    background-color: #eb8d00;
    border-radius: 10px;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

const MyLocation = style.button`
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 1;
  font-size: 15px;
  color: #fff;
  padding: 10px;
  background-color: #eb8d00;
  border-radius: 10px;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const Modal = style.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  
  top: 0;
  left: 0;
  z-index:1;
  & .modal-content {
    background-color: white;
  }
`;
