// DataFrame.jsx

import AreaChart from './charts/AreaChart'
import PieChart from './charts/PieChart'

const DataContainer = (props) => {
  
  return (
    <div className="flex items-center justify-between pt-3 mt-5 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
        {props.children || "Hello world!"}
        
      </div>
  );
  
};

const DataCouncilCard = (props) => {
  
  return (
    <div className="flex items-center gap-x-6">
      <img alt="" src={props.imageUrl} className="h-32 rounded-full dark:bg-gray-600 dark:text-white rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500" />
      <div>
        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">District Assembler: {props.name}</h3>
        <p className="text-sm font-semibold leading-6 text-indigo-600">Contact: {props.role}</p>
      </div>
    </div>  
  );
  
};

const DataFrame = (props) => {
  const {districtSelected} = props.mapInputs;

  // No council member for assembly district 85
  // https://nyassembly.gov/mem/?ad=085
  let headshot = undefined;
  if (districtSelected !== undefined && districtSelected != 85) {
    headshot = (`/council_headshots/district-${districtSelected}.png`);
  }

  return (
  
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 overflow-y-scroll" style={{height:"79vh"}}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">{props.title || "Data"}:</span>
        </div>
      </div>
      
      { headshot ? (
        <DataContainer>
          <DataCouncilCard imageUrl={headshot} name={"Bob Marley"} role={"+1 (234) 567-8910"}/>
        </DataContainer>
      ) : "" }
      
      <DataContainer>
        <PieChart title="Money Wasted" data={[
          25, 24, 22
        ]}/>
      </DataContainer>
      <DataContainer>
        <AreaChart title="Money Saved" data={[
          25, 24, 22
        ]}/>
      </DataContainer>
    </div>  
    
  );
  
} 

export default DataFrame;

