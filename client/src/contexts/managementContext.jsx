import React, { useState} from 'react';

export const ManagementContext = React.createContext();

export const ManagementProvider = (props) => {
  const [studies, setStudies] = useState(
    {
      study : {},
      studies : []
    }

  )
  return (  
    <ManagementContext.Provider value={[studies,setStudies]}>
        {props.children}
      </ManagementContext.Provider>
  );
}