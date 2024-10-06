import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { districtAtLocation } from "../District";

const Map = () => {
  const [geoData, setGeoData] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [visibleData, setVisibleData] = useState(null);

  useEffect(() => {
    fetch("/New York City Bike Routes_20241005.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGeoData(data);
      });
  }, []);

  const getStyle = useCallback(
    (feature) => ({
      color: getColor(feature.properties.boro),
      weight: 2,
      opacity: 1,
      fillOpacity: 0.7,
    }),
    []
  );

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

  const GeoJSONLayer = React.memo(({ data, style }) => {
    return <GeoJSON data={data} style={style} />;
  });

  function MapEventHandler() {
    const map = useMap();

    useEffect(() => {
      if (!geoData) return;

      const updateVisibleData = () => {
        const bounds = map.getBounds();

        const filteredFeatures = geoData.features.filter((feature) => {
          const coordinates = feature.geometry.coordinates;
          // Handle different geometry types
          if (feature.geometry.type === "LineString") {
            return coordinates.some((coord) => bounds.contains([coord[1], coord[0]]));
          } else if (feature.geometry.type === "MultiLineString") {
            return coordinates.some((line) =>
              line.some((coord) => bounds.contains([coord[1], coord[0]]))
            );
          }
          return false;
        });

        setVisibleData({
          type: "FeatureCollection",
          features: filteredFeatures,
        });
      };

      updateVisibleData(); // Initial load
      map.on("moveend", updateVisibleData); // Update on map move

      return () => {
        map.off("moveend", updateVisibleData);
      };
    }, [geoData, map]);

    return null; // This component doesn't render anything visible
  }

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
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; OpenStreetMap contributors'
        />
        {visibleData && <GeoJSONLayer data={visibleData} style={getStyle} />}
        <LocationMarker />
        <MapEventHandler />
      </MapContainer>
      {clickedPosition && (
        <div style={{ padding: "10px" }}>
          <h3>Clicked Coordinates:</h3>
          <p>Latitude: {clickedPosition.lat}</p>
          <p>Longitude: {clickedPosition.lng}</p>
          <p>District: {districtAtLocation([clickedPosition.lng, clickedPosition.lat])}</p>
        </div>
      )}
    </>
  );
};

export default Map;
