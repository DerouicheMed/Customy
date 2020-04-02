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
      questionFile: null,
      questionResponses: [],
      responseText: "",
      responseFile: null,
      questionIndex : -1,
      files : []
    }

  )
  return (  
    <CreateFormContext.Provider value={[form,setForm]}>
        {props.children}
      </CreateFormContext.Provider>
  );
}