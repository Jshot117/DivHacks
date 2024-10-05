import { useState } from "react";
// MapControls.jsx

const MapControls = (props) => {
  
  const [origin, setOriginPoint] = useState(null);
  const [destination, setDestinationPoint] = useState(null);
  
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
      
      if (props.callback) {
        
        props.callback(json, origin, destination);
        
      }
      
    } catch (error) {
      console.error(error.message);
    }
    
  };
  
  return (
    <div className="block">
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="starting-point" className="block text-sm font-medium leading-6 text-gray-900">Origin</label>
          <div className="">
            <input type="text" name="starting-point" id="starting-point" autoComplete="given-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={origin} onChange={(e) => {
          
              
              setOriginPoint(e.target.value);
              
            }}/>
          </div>
        </div>
      
        <div className="sm:col-span-3">
          <label htmlFor="ending-point" className="block text-sm font-medium leading-6 text-gray-900">Destination</label>
          <div className="">
            <input type="text" name="ending-point" id="ending-point" autoComplete="family-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={destination} onChange={(e) => {
          
              
              setDestinationPoint(e.target.value);
              
            }}/>
          </div>
        </div>
      </div>
      <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center mt-4 dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400" onClick={function(){
        
      }}>
        Get Distance
      </button>
    </div>
    
  );
  
};

export default MapControls;