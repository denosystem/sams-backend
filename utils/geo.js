function toRad(x) {
  return (x * Math.PI) / 180;
}

// Haversine distance in meters
function distanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function withinRadius(center, point, radiusM) {
  const d = distanceMeters(center.lat, center.lng, point.lat, point.lng);
  return { ok: d <= radiusM, distanceM: Math.round(d) };
}

module.exports = { distanceMeters, withinRadius };
