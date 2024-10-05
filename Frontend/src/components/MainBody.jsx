// MainBody.jsx


import MapFrame from './MapFrame';
import DataFrame from './DataFrame';

import Map from './Map';

const MainBody = () => {
  
  return (
    <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <main>
          <div className="px-4 pt-6">
            <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
              
              
              <MapFrame>
                <Map/>
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

export default MainBody;

