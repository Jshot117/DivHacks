
const Header = () => {
  
  return (
    
    <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a href="/" className="flex ml-2 md:mr-24">
              <img src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo"/>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    
  );
  
};

const MapFrame = (props) => {
  
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">{props.title || "Map"}:</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
        {props.children || "Hello world!"}
      </div>
    </div>
  );
  
};

const DataFrame = (props) => {
  
  return (
  
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">{props.title || "Data"}:</h3>
      
      <div className="flex items-center justify-between pt-3 mt-5 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
        {props.children || "Hello world!"}
        
      </div>
    </div>  
    
  );
  
} 

const Main = () => {
  
  return (
    <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <main>
          <div className="px-4 pt-6">
            <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
              
              
              <MapFrame>
                
              </MapFrame>
              
              <DataFrame>
              
                
              </DataFrame>
              
              
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

const App = () => {
  return (
    <>
      <Header/>
      <Main/>
    </>
  );
};

export default App;
