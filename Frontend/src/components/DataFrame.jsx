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

const DataFrame = (props) => {
  
  return (
  
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">{props.title || "Data"}:</span>
        </div>
      </div>
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

