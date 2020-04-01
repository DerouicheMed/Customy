import React, { useState} from 'react';

export const CreateFormContext = React.createContext();

export const CreateFormProvider = (props) => {
  const [form, setForm] = useState(
    {
      formTitle: "",
      formDescription: "",
      formQuestions: [],
      questionText: "",
      questionType: "yes/no",
      questionFile: "",
      questionResponses: [],
      responseText: "",
      responseFile: "",
      questionIndex : -1
    }

  )
  return (  
    <CreateFormContext.Provider value={[form,setForm]}>
        {props.children}
      </CreateFormContext.Provider>
  );
}