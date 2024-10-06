import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { districtAtLocation, districtBoundaries } from "../District";
import MapEventHandler from "./MapEventHandler"; 

const Map = ({inputCallback, plannedRoute, plannedRouteQuery, origin, setOriginPoint, destination, setDestinationPoint, clickCounter, setClickCounter}) => {
  const [geoData, setGeoData] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [visibleData, setVisibleData] = useState(null);
  
  const districtSelected = useMemo(
    () =>
      clickedPosition !== null
        ? districtAtLocation([clickedPosition.lng, clickedPosition.lat])
        : undefined,
    [clickedPosition]
  );

  const displayDistrictGeoJSON = useMemo(
    () =>
      districtSelected !== undefined
    ? districtBoundaries["" + districtSelected]
    : undefined,
    [districtSelected]
  );

  useMemo(() => inputCallback({districtSelected}), [districtSelected]);
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

  const getPlannedRouteStyle = useCallback(
    (_feature) => ({
      color: "#FF00FF",
      weight: 10,
      opacity: 1,
      fillOpacity: 1,
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
      color: "#00AAFF",
      weight: 3.5,
      opacity: 1,
      fillOpacity: 0.5,
    };
  }, []);

  const GeoJSONLayer = React.memo(({ data, style }) => {
    return <GeoJSON data={data} style={style} />;
  });

  function LocationMarker() {
    useMapEvents({
      click(e) {
        
        console.log("Map.jsx[LocationMarker]:", JSON.stringify(e.latlng));
        
        if (clickCounter == 1) {
          setOriginPoint(e.latlng.lat.toString() + "," + e.latlng.lng.toString());
          // setDestinationPoint(null);
        } else if (clickCounter == 2) {
          setDestinationPoint(e.latlng.lat.toString() + "," + e.latlng.lng.toString())
        } else if (clickCounter == 0) {
          
          setClickedPosition(e.latlng);
          
        }
        
        // setClickCounter((clickCounter + 1) % 2);
        
        
        
        
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
        {plannedRoute && plannedRoute.route.routes.length && <GeoJSONLayer key={plannedRouteQuery} data={plannedRoute.route.routes[0].geometry} style={getPlannedRouteStyle} />}
        {displayDistrictGeoJSON && (
          <GeoJSON
            key={districtSelected}
            data={displayDistrictGeoJSON}
            style={getDisplayDistrictStyle}
          />
        )}
        <LocationMarker />
        <MapEventHandler geoData={geoData} setVisibleData={setVisibleData} />
      </MapContainer>
      {clickedPosition && (
        <div style={{ padding: "10px" }}>
          <p>Latitude: {clickedPosition.lat}</p>
          <p>Longitude: {clickedPosition.lng}</p>
          <p>District: {districtSelected}</p>
        </div>
      )}
    </>
  );
};

export default Map;
