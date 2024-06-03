function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // نصف قطر الأرض بالكيلومترات
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function calculateDistance(event) {
  event.preventDefault();

  const lat2 = parseFloat(document.getElementById("latitude").value);
  const lon2 = parseFloat(document.getElementById("longitude").value);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat1 = position.coords.latitude;
        const lon1 = position.coords.longitude;
        console.log(lat1);
        console.log(lon1);

        const distance = haversineDistance(lat1, lon1, lat2, lon2);
        document.getElementById(
          "result"
        ).innerHTML = `Distance: <span class="fw-bold">${distance.toFixed(
          2
        )}</span> Km`;
        if (distance.toFixed(2) * 1000 <= 100) {
          console.log("sucess");
        } else {
          console.log("caution");
        }
      },
      (error) => {
        document.getElementById("result").textContent = `خطأ: ${error.message}`;
      }
    );
  } else {
    document.getElementById("result").textContent =
      "الموقع الجغرافي غير مدعوم من هذا المتصفح.";
  }
}

document
  .getElementById("coordinateForm")
  .addEventListener("submit", calculateDistance);
