import React, { useState} from 'react';

export const ManagementContext = React.createContext();

export const ManagementProvider = (props) => {
  const [management, setManagement] = useState(
    {     
      study : {}, 
      studies : [],
      forms : [],
      selectedForm : {},
      selectedDate : new Date(),
      groups : [],
      publishState : 'published'
    }

  )
  return (  
    <ManagementContext.Provider value={[management, setManagement]}>
        {props.children}
      </ManagementContext.Provider>
  );
}