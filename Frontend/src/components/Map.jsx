import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { districtAtLocation, districtBoundaries } from "../District";
import MapEventHandler from "./MapEventHandler"; 

const Map = ({inputCallback, plannedRoute, plannedRouteQuery, clickCallback, origin, destination}) => {
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

  useMemo(() => inputCallback({districtSelected, clickedPosition}), [districtSelected, clickedPosition]);
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
      color: "#404040",
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
        return "#00AAFF"; // Yellow for Queens
      case "5":
        return "#FF00FF"; // Magenta for Staten Island
      default:
        return "#FFFFFF"; // White for unknown
    }
  };

  const getDisplayDistrictStyle = useCallback(() => {
    return {
      color: "#5c5c5c",
      fillColor: "#DDDDDD",
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
        
        if (clickCallback !== undefined) {
          clickCallback(e.latlng);
        } else {
          setClickedPosition(e.latlng);
        }
      },
    });
    return null;
  }

  return (
    <>
      <MapContainer
        center={[40.71427, -74.00597]}
        zoom={13}
        zoomSnap={0.3}
        preferCanvas={true}
        style={{ height: "44vh", width: "100%" }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {plannedRoute && plannedRoute.route.routes.length && <GeoJSONLayer key={plannedRouteQuery} data={plannedRoute.route.routes[0].geometry} style={getPlannedRouteStyle} />}
        {visibleData && <GeoJSONLayer data={visibleData} style={getBikeLaneStyle} />}
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
    </>
  );
};

export default Map;
