
import React, { useEffect, useCallback } from "react";
import { useMap } from "react-leaflet";

function MapEventHandler({ geoData, setVisibleData }) {
  const map = useMap();

  const updateVisibleData = useCallback(() => {
    if (!geoData || !map) return;

    const bounds = map.getBounds();

    const filteredFeatures = geoData.features.filter((feature) => {
      const coordinates = feature.geometry.coordinates;

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
  }, [geoData, map, setVisibleData]);

  useEffect(() => {
    if (!geoData || !map) return;

    updateVisibleData(); 

    map.on("moveend", updateVisibleData); 

    return () => {
      map.off("moveend", updateVisibleData);
    };
  }, [map, geoData, updateVisibleData]);

  return null;
}

export default MapEventHandler;
