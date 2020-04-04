import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import axios from "axios";
import { CreateFormContext as Context } from "../../contexts/createFormContext";

import FormFirstStep from "./formFirstStep";
import FormSecondStep from "./formSecondStep";
import FormThirdStep from "./formThirdStep";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

/**
 * this function let you add steps and name them
 */
function getSteps() {
  return [
    "Name and describe the form",
    "Add questions to the foom",
    "Preview form and submit",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormFirstStep />;
    case 1:
      return <FormSecondStep />;
    case 2:
      return <FormThirdStep />;
    default:
      return "Unknown step";
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [progressForm, setProgressForm] = React.useState(0);
  const [progressFiles, setProgressFiles] = React.useState(0);

  const isStepOptional = (step) => {
    /**
     * -1 means no step is optional. To set a step option
     * change -1 to the step number. Steps start from 0
     */
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 2) addNewForm();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    console.log("reset");
    setForm({
      formTitle: "",
      formDescription: "",
      formQuestions: [],
      questionText: "",
      questionType: "yes/no",
      questionFile: null,
      questionResponses: [],
      responseText: "",
      responseFile: null,
      questionIndex: -1,
      files: [],
    });
    setActiveStep(0);
  };

  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  /**
   * this function makes an api call to the server to add a new form
   */
  const addNewForm = () => {
    let newForm = {
      title: form.formTitle,
      description: form.formDescription,
      questions: form.formQuestions,
    };

    let formData = new FormData();
    form.files.map((file) => {
      formData.append("file", file);
    });

    //this will send the form
    axios
      .post("http://localhost:5000/api/form", newForm, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          console.log("onUploadProgress", totalLength);
          if (totalLength !== null) {
            setProgressForm(
              Math.round((progressEvent.loaded * 100) / totalLength)
            );
          }
        },
      })
      .catch((err) => console.log(err));

    //this will send the files
    axios
      .post("http://localhost:5000/api/form/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          console.log("onUploadProgress", totalLength);
          if (totalLength !== null) {
            setProgressFiles(
              Math.round((progressEvent.loaded * 100) / totalLength)
            );
          }
        },
      })
      .catch((err) => console.log(err));
  };

  /**
   * this function sets the next button to disabled according to conditions
   */
  const setNextButtonDisabled = () => {
    switch (activeStep) {
      case 0:
        return form.formTitle.length === 0 ? true : false;
      case 1:
        return form.formQuestions === undefined ||
          form.formQuestions.length === 0
          ? true
          : false;
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <>
            <div className="row">
              <div className="col-md-12">
                <LinearProgress
                  variant="determinate"
                  value={progressForm}
                  style={{ height: "10px" }}
                />
                <LinearProgress
                  variant="determinate"
                  value={progressFiles}
                  style={{ height: "10px" }}
                />
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-12"
                style={{
                  height: "500px",
                  textAlign: "center",
                  padding: "50px",
                }}
              >
                {progressForm === 100 && progressForm === 100 ? (
                  <h1 style={{ marginBottom: "50px" }}>
                    Form has been created
                  </h1>
                ) : (
                  <h1 style={{ marginBottom: "50px" }}>Please wait...</h1>
                )}
                <button
                  className="btn btn-primary"
                  style={{
                    textTransform: "none",
                    backgroundColor: "none",
                    margin: " 0px 5px 15px 5px",
                  }}
                  disabled={!(progressForm === 100 && progressForm === 100)}
                >
                  <i className="fas fa-folder-open" style={{ margin: 5 }}></i>
                  Manage existing forms
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                  style={{
                    textTransform: "none",
                    backgroundColor: "none",
                    margin: " 0px 5px 15px 5px",
                  }}
                  disabled={!(progressForm === 100 && progressForm === 100)}
                >
                  <i className="fas fa-folder-plus" style={{ margin: 5 }}></i>
                  Create new Form
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={setNextButtonDisabled()}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
