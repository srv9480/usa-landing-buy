import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";





// creating functional component ans getting props from app.js and destucturing them
const StepErrorFinal = ({ nextStep, handleFormData, prevStep, values }) => {
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
            <div style={{ color: "#ec347a", marginBottom: "30px", fontWeight: "600", fontSize: "1.3125rem" }}>{`Something went wrong :(`}
            </div>
            <Form.Group className="mb-3">
              
              <div style={{width: "100%", marginTop: "2rem"}} > {} <br /> Please, contact support to solve the problem, if you have lost the money </div>
            </Form.Group>


            <div style={{ display: "block", justifyContent: "space-around" }}>
             
              <Button variant="primary" onClick={""}>
                Contact the support
              </Button>

             
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepErrorFinal;
