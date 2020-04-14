import React from 'react';

export const FormContext = React.createContext();

export const FormProvider = (props) => {
  const [form, setForm] = React.useState(
    {
      formTitle: "",
      formDescription: "",
      formQuestions: [],
      questionText: "",
      questionType: "yes/no",
      questionFileName : "",
      questionFile: null,
      questionResponses: [],
      responseText: "",
      responseFileName: "",
      responseFile: null,
      questionIndex : -1,
      files : []
    }

  )
  return (  
    <FormContext.Provider value={[form,setForm]}>
        {props.children}
      </FormContext.Provider>
  );
}