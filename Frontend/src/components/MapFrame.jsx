// MapFrame.jsx


const MapFrame = (props) => {
  
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">{props.title || "Map"}:</span>
        </div>
      </div>
      <div className="items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
        {props.children || "Hello world!"}
      </div>
    </div>
  );
  
};

export default MapFrame;

