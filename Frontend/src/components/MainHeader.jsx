// MainHeader.jsx
const MainHeader = () => {
  
  return (
    
    <nav className="fixed z-50 w-full border-b border-gray-200 dark:bg-gray-800/75 dark:border-gray-700 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] bg-white/75" style={{zIndex:1000000}}>
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a href="/" className="flex ml-2 md:mr-24">
              <img src="https://www.svgrepo.com/show/70289/bike.svg" className="h-8 mr-3 hover:rotate-45 transition dark:fill-white" alt="FlowBite Logo"/>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">BikeLanes DivHacks</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    
  );
  
};

export default MainHeader;

