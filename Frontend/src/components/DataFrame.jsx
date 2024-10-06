// DataFrame.jsx

import AreaChart from './charts/AreaChart'
import PieChart from './charts/PieChart'
import { districtsRepsJson } from '../District';

import { useState } from 'react';

const DataContainer = (props) => {
  
  return (
    <div className="flex items-center justify-between pt-3 mt-5 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
        {props.children || "Hello world!"}
        
      </div>
  );
  
};

const DataCouncilCard = ({district, imageUrl, emailText, setEmailText}) => {
  const rep = districtsRepsJson["" + district];
  const {name, email, address_info} = rep;
  
  if (!emailText.includes(name)) {
    
    setEmailText(`Dear ${name},

I hope this message finds you well. I am writing to bring attention to a pressing concern in our community and the need for more bike lanes throughout our district. As a resident of New York City, I have noticed that cycling, while a popular and eco-friendly mode of transportation, often presents safety challenges due to the limited availability of designated bike lanes.

Expanding the network of bike lanes would greatly benefit the district by%3A
- Ensuring safer roads for cyclists and reducing the risk of accidents.
- Encouraging more residents to choose biking as a sustainable, healthy transportation option.
- Reducing traffic congestion, especially during peak commuting hours.
- Promoting greener, more environmentally friendly alternatives to driving.

Many of my fellow community members share these sentiments, and I am gathering signatures to show the broad support for this initiative. I would be happy to discuss this in more detail and explore any opportunities to collaborate with your office to make our streets safer and more accessible for everyone.

Thank you for your time and attention to this matter. I look forward to your response.

Sincerely,
[Your Name]`);
    
  }
  
  return (
    <div className="flex items-center w-full">
      <img alt="" src={imageUrl} className="h-32 dark:bg-gray-600 dark:text-white rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500" />
      <div className="w-full ml-4">
        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">District Assembler: {name}</h3>
        <p className="text-sm font-semibold leading-6 text-indigo-600">Contact: {email}</p>
        {/* <p className="text-sm font-semibold leading-6 text-indigo-600">{address_info}</p> */}
        
        <textarea className="block dark:bg-gray-600 dark:text-white w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={emailText} onChange={(e) => {
          
          setEmailText(e.target.value);
          
        }}></textarea>
        
        <a 
          href={"mailto:" + email + new URLSearchParams({
            body: emailText,
            subject: "Petition for Expanding Bike Lanes in Our District"
          }).toString()}
          className = "bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center mt-4 dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 "
        >Send Email</a>

      </div>
    </div>  
  );
  
};

const DataFrame = (props) => {
  const {districtSelected} = props.mapInputs;

  const [emailText, setEmailText] = useState("");

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
          <DataCouncilCard emailText={emailText} setEmailText={setEmailText} district={districtSelected} imageUrl={headshot}/>
        </DataContainer>
      ) : "" }
      <DataContainer>
        <AreaChart title="Money Saved From Traveling by Bike" keyData={"200$"} data={[
          192, 167, 152, 141, 115
        ]}/>
      </DataContainer>
      <DataContainer>
        <PieChart title="CO2 Emissions Contributions After A Month" keyData={"-97%"} data={[
          200, 192, 167, 152, 141, 115, 92, 85, 72, 43
        ]}/>
      </DataContainer>
      
    </div>  
    
  );
  
} 

export default DataFrame;

