export const getCurrentLocation = (
  setGeoLocation: (lat: number, lon: number) => void
) => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setGeoLocation(lat, lon);
          resolve({ lat, lon });
        },
        (error) => {
          console.error("위치정보를 가져오는 데 실패했습니다.", error);
          reject(error);
        }
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
      reject(new Error("Geolocation을 지원하지 않습니다."));
    }
  });
};
