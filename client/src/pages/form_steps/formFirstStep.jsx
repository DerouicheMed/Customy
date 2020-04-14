import React, { useContext } from "react";
import { FormContext as Context } from "../../contexts/formContext"

const FormFirstStep = () => {
  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  /**
   * this function adds the inputs value into the state
   */
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="form-group">
          <label>
            To create a form please start by entering the form title and
            description
          </label>
        </div>
        <div className="form-group">
          <label>Form Title *</label>
          <input
            type="text"
            className="form-control"
            name="formTitle"
            value={form.formTitle}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="formDescription"
            value={form.formDescription}
            onChange={onChange}
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default FormFirstStep;
