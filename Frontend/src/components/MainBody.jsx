// MainBody.jsx


import MapFrame from './MapFrame';
import DataFrame from './DataFrame';

import Map from './Map';
import MapControls from './MapControls'
import { useState, useMemo } from 'react';

const MainBody = () => {
  const [mapInputs, setMapInputs] = useState({districtSelected: undefined, clickedPosition: undefined});
  const [plannedRoute, setPlannedRoute] = useState(undefined);
  const [plannedRouteQuery, setPlannedRouteQuery] = useState(undefined);

  const [focusedInput, setFocusedInput] = useState(undefined);
  const [origin, setOriginPoint] = useState(null);
  const [destination, setDestinationPoint] = useState(null);

  return (
    <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <main>
          <div className="px-4 pt-6">
            <div className="grid gap-4 l:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
              <MapFrame>
                <MapControls callback={(route, origin, dest) => {
                    setPlannedRoute(route);
                    setPlannedRouteQuery(origin && dest ? (origin + dest) : undefined);
                  }}
                  setFocusedInput={setFocusedInput}
                  origin={origin} setOriginPoint={setOriginPoint} destination={destination} setDestinationPoint={setDestinationPoint}
                />
                <div className="my-4 border-gray-200">
                  <Map clickCallback={
                    focusedInput !== undefined ? (clickedPosition) => {
                      if (focusedInput === "origin") {
                        setOriginPoint([clickedPosition.lat, clickedPosition.lng]);
                      } else if (focusedInput === "destination") {
                        setDestinationPoint([clickedPosition.lat, clickedPosition.lng]);
                      }
                      setFocusedInput(undefined); 
                    } : undefined
                  } inputCallback={setMapInputs} plannedRoute={plannedRoute} plannedRouteQuery={plannedRouteQuery} origin={origin} destination={destination}/>
                </div>
              </MapFrame>
              <DataFrame mapInputs={mapInputs}></DataFrame>
            </div>
          </div>
        </main>
        <p className="my-10 text-sm text-center text-gray-500">
            © 2024 <a href="" className="hover:underline" target="_blank">DivHacks</a>. All rights reserved.
        </p>
      </div>
    </div>
  );
  
};

export default MainBody;

