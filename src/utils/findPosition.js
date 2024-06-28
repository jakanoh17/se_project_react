function findPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(`Error retrieving geolocation: ${error}`);
        }
      );
    } else {
      reject("Geolocation is not supported on this browser.");
    }
  });
}

export default findPosition;
