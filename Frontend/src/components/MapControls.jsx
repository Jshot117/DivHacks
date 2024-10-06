import { useState } from "react";
// MapControls.jsx

const MapControls = ({
  origin, setOriginPoint, destination, setDestinationPoint, setFocusedInput, callback, clickCounter, setClickCounter
}) => {
  
  const getData = async function() {
    
    // http://localhost:3000/api?origin=New York&destination=Los Angeles
    
    const url = "http://localhost:3000/api?" + new URLSearchParams({
      origin,
      destination
    }).toString();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      
      if (callback) {
        
        callback(json, origin, destination);
        
      }
      
    } catch (error) {
      console.error(error.message);
    }
    
  };
  
  return (
    <div className="block">
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="starting-point" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Origin</label>
          <div className="">
            <input type="text" name="starting-point" id="starting-point" autoComplete="given-name" defaultValue={origin}
              className="block dark:bg-gray-600 dark:text-white w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onFocus={() => setFocusedInput("origin")}
              onBlur={(e) => setFocusedInput(e?.relatedTarget?.classList?.contains("leaflet-container") ? "origin" : undefined)}
              onChange={(e) => setOriginPoint(e.target.value)}
            />
          </div>
        </div>
      
        <div className="sm:col-span-3">
          <label htmlFor="ending-point" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Destination</label>
          <div className="">
            <input type="text" name="ending-point" id="ending-point" autoComplete="family-name" defaultValue={destination}
              className="block dark:bg-gray-600 dark:text-white w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onFocus={() => setFocusedInput("destination")}
              onBlur={(e) => setFocusedInput(e?.relatedTarget?.classList?.contains("leaflet-container") ? "destination" : undefined)}
              onChange={(e) => setDestinationPoint(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center mt-4 dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400" onClick={function(){
        
        getData();
        
      }}>
        Get Distance
      </button>
    </div>
    
  );
  
};

export default MapControls;