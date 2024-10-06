import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { districtAtLocation, districtBoundaries } from "../District";
import MapEventHandler from "./MapEventHandler"; 

const Map = () => {
  const [geoData, setGeoData] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [visibleData, setVisibleData] = useState(null);

  const displayDistrict = useMemo(
    () =>
      clickedPosition !== null
        ? districtAtLocation([clickedPosition.lng, clickedPosition.lat])
        : undefined,
    [clickedPosition]
  );

  const displayDistrictGeoJSON = useMemo(
    () =>
      displayDistrict !== undefined
        ? districtBoundaries["" + displayDistrict]
        : undefined,
    [displayDistrict]
  );

  useEffect(() => {
    fetch("/New York City Bike Routes_20241005.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGeoData(data);
      });
  }, []);

  const getBikeLaneStyle = useCallback(
    (feature) => ({
      color: getBikeRouteColor(feature.properties.boro),
      weight: 2,
      opacity: 1,
      fillOpacity: 0.7,
    }),
    []
  );

  const getBikeRouteColor = (boro) => {
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

  const getDisplayDistrictStyle = useCallback(() => {
    return {
      color: "#0000FF",
      weight: 2,
      opacity: 1,
      fillOpacity: 1,
    };
  }, []);

  const GeoJSONLayer = React.memo(({ data, style }) => {
    return <GeoJSON data={data} style={style} />;
  });

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setClickedPosition(e.latlng);
      },
    });
    return null;
  }

  return (
    <>
      <MapContainer
        center={[40.71427, -74.00597]}
        zoom={13}
        preferCanvas={true}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {visibleData && <GeoJSONLayer data={visibleData} style={getBikeLaneStyle} />}
        {displayDistrictGeoJSON && (
          <GeoJSON
            key={displayDistrict}
            data={displayDistrictGeoJSON}
            style={getDisplayDistrictStyle}
          />
        )}
        <LocationMarker />
        <MapEventHandler geoData={geoData} setVisibleData={setVisibleData} />
      </MapContainer>
      {clickedPosition && (
        <div style={{ padding: "10px" }}>
          <h3>Clicked Coordinates:</h3>
          <p>Latitude: {clickedPosition.lat}</p>
          <p>Longitude: {clickedPosition.lng}</p>
          <p>District: {displayDistrict}</p>
        </div>
      )}
    </>
  );
};

export default Map;
