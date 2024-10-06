// DataFrame.jsx

import AreaChart from './charts/AreaChart'
import PieChart from './charts/PieChart'
import { districtsRepsJson } from '../District';

const DataContainer = (props) => {
  
  return (
    <div className="flex items-center justify-between pt-3 mt-5 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
        {props.children || "Hello world!"}
        
      </div>
  );
  
};

const DataCouncilCard = ({district, imageUrl}) => {
  const rep = districtsRepsJson["" + district];
  const {name, email, address_info} = rep;

  return (
    <div className="flex items-center gap-x-6">
      <img alt="" src={imageUrl} className="h-32 dark:bg-gray-600 dark:text-white rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500" />
      <div>
        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">District Assembler: {name}</h3>
        <p className="text-sm font-semibold leading-6 text-indigo-600">Contact: {email}</p>
        {/* <p className="text-sm font-semibold leading-6 text-indigo-600">{address_info}</p> */}
        <a 
          href={`mailto:${email}?subject=Petition%20for%20Expanding%20Bike%20Lanes%20in%20Our%20District&body=Dear%20${name}%2C%0D%0A%0D%0AI%20hope%20this%20message%20finds%20you%20well.%20I%20am%20writing%20to%20bring%20attention%20to%20a%20pressing%20concern%20in%20our%20community%3A%20the%20need%20for%20more%20bike%20lanes%20throughout%20our%20district.%20As%20a%20resident%20of%20New%20York%20City%2C%20I%20have%20noticed%20that%20cycling%2C%20while%20a%20popular%20and%20eco-friendly%20mode%20of%20transportation%2C%20often%20presents%20safety%20challenges%20due%20to%20the%20limited%20availability%20of%20designated%20bike%20lanes.%0D%0A%0D%0AExpanding%20the%20network%20of%20bike%20lanes%20would%20greatly%20benefit%20the%20district%20by%3A%0D%0A-%20Ensuring%20safer%20roads%20for%20cyclists%20and%20reducing%20the%20risk%20of%20accidents.%0D%0A-%20Encouraging%20more%20residents%20to%20choose%20biking%20as%20a%20sustainable%2C%20healthy%20transportation%20option.%0D%0A-%20Reducing%20traffic%20congestion%2C%20especially%20during%20peak%20commuting%20hours.%0D%0A-%20Promoting%20greener%2C%20more%20environmentally%20friendly%20alternatives%20to%20driving.%0D%0A%0D%0AMany%20of%20my%20fellow%20community%20members%20share%20these%20sentiments%2C%20and%20I%20am%20gathering%20signatures%20to%20show%20the%20broad%20support%20for%20this%20initiative.%20I%20would%20be%20happy%20to%20discuss%20this%20in%20more%20detail%20and%20explore%20any%20opportunities%20to%20collaborate%20with%20your%20office%20to%20make%20our%20streets%20safer%20and%20more%20accessible%20for%20everyone.%0D%0A%0D%0AThank%20you%20for%20your%20time%20and%20attention%20to%20this%20matter.%20I%20look%20forward%20to%20your%20response.%0D%0A%0D%0ASincerely%2C%0D%0A%5BYour%20Name%5D`}
          className = "text-sm font-semibold leading-6 text-indigo-600 border-b-2 border-indigo-600 hover:border-indigo-400 hover:text-indigo-400"
        >Send Email</a>

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
          <DataCouncilCard district={districtSelected} imageUrl={headshot}/>
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

