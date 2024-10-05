import { useState } from "react";
// MapControls.jsx

const MapControls = (props) => {
  
  const [originPoint, setOriginPoint] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);
  
  return (
    <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label for="starting-point" className="block text-sm font-medium leading-6 text-gray-900">Origin</label>
        <div className="">
          <input type="text" name="starting-point" id="starting-point" autocomplete="given-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={originPoint} onChange={(e) => {
        
            
            setOriginPoint(e.target.value);
            
          }}/>
        </div>
      </div>
    
      <div className="sm:col-span-3">
        <label for="ending-point" className="block text-sm font-medium leading-6 text-gray-900">Destination</label>
        <div className="">
          <input type="text" name="ending-point" id="ending-point" autocomplete="family-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={destinationPoint} onChange={(e) => {
        
            
            setDestinationPoint(e.target.value);
            
          }}/>
        </div>
      </div>
    </div>
  );
  
};

export default MapControls;