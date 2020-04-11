import React from "react";

const FormDetailsPanel = ({ form }) => {

  const renderPublicationDate = () => {
    return (form.publishedAt === undefined || form.publishedAt === null)? "This form is not published yet": form.publishedAt
  }

  const renderExpirationDate = () => {
    if (form.publishedAt !== undefined && form.publishedAt !== null){
      return (form.expiresAt === undefined || form.expiresAt === null) ? 'Expiration date : This form has non expiration date' : 'Expiration date : '+form.expiresAt
    }
  }
  return (
    <div className="row" style={{padding : 10}}>
      <div className="offset-md-2 col-md-8 offset-md-2">
        <h4>{form.title}</h4>
        <h6>
          { form.description !== undefined && form.description.length !== 0
            ? form.description
            : "No description for this form"}
        </h6>
        <p>
          Created at : {form.createdAt} <br />
          Last updated at : {form.updatedAt} <br />
          Published at :
          {renderPublicationDate()}
          <br />
          {renderExpirationDate()}
        </p>
      </div>
    </div>
  );
};

export default FormDetailsPanel;
