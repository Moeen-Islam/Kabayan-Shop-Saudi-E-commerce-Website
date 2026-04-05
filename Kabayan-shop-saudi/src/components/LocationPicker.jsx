import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);

  return null;
}

function ClickMarker({ value, onChange }) {
  const [position, setPosition] = useState(value);

  useEffect(() => {
    setPosition(value);
  }, [value]);

  useMapEvents({
    click(e) {
      const next = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        locationUrl: `https://www.google.com/maps?q=${e.latlng.lat},${e.latlng.lng}`,
      };

      setPosition(next);
      onChange(next);
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}

const LocationPicker = ({ value, onChange }) => {
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported in this browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          locationUrl: `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`,
        };

        onChange(next);
        toast.success("Live location pinned successfully");
        setLoadingLocation(false);
      },
      (error) => {
        console.error(error);
        toast.error("Location permission denied or unavailable");
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const center = value ? [value.lat, value.lng] : [24.7136, 46.6753];

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        disabled={loadingLocation}
        className="w-full rounded-xl border border-black px-4 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loadingLocation ? "Getting live location..." : "Use My Current Location"}
      </button>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <MapContainer
          center={center}
          zoom={value ? 15 : 10}
          style={{ height: "320px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ChangeView center={center} />
          <ClickMarker value={value} onChange={onChange} />
        </MapContainer>
      </div>

      <p className="text-xs text-gray-500">
        You can use your live location or click manually on the map to pin your house location.
      </p>
    </div>
  );
};

export default LocationPicker;