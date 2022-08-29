import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

import errorImg from "@assets/images/error.png";




// creating functional component ans getting props from app.js and destucturing them
const StepError = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    if (
      validator.isEmpty(values.firstName) ||
      validator.isEmpty(values.lastName)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <>
      <Card style={{ marginTop: 0, border: "none" }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <div style={{ color: "#ec347a", marginBottom: "30px", fontWeight: "600", fontSize: "1.3125rem" }}>Processing Your Order</div>
            <Form.Group className="mb-3">
              <img src={errorImg} alt="error-message" width="170" height="170" />
              <div style={{width: "100%", marginTop: "2rem"}} > Error! <br /> Reason: Wrong inputted data. Description: Invalid US phone number. Must: be a valid international phone number.  </div>
            </Form.Group>


            <div style={{ display: "block", justifyContent: "space-around" }}>
             
              <Button variant="primary" onClick={prevStep}>
                Back
              </Button>

              <Button variant="primary" type="submit">
                К ошибке
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepError;
