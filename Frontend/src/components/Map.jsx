import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

const Map = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/New York City Bike Routes_20241005.geojson")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGeoData(data);
      });
  }, []);

  // Define a style function
  const getStyle = (feature) => {
    return {
      color: getColor(feature.properties.boro),
      weight: 2,
      opacity: 1,
      fillOpacity: 0.7,
    };
  };

  // Define a function to get color based on a property
  const getColor = (boro) => {
    switch (boro) {
      case "1":
        return "#FF0000"; // Red for Manhattan
      case "2":
        return "#0000FF"; // Blue for Bronx
      case "3":
        return "#00FF00"; // Green for Brooklyn
      case "4":
        return "#FFFF00"; // Yellow for Queens
      case "5":
        return "#FF00FF"; // Magenta for Staten Island
      default:
        return "#FFFFFF"; // White for unknown
    }
  };

  return (
    <MapContainer
      center={[40.71427, -74.00597]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoData && <GeoJSON data={geoData} style={getStyle} />}
    </MapContainer>
  );
};

export default Map;
