import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

import phoneicon from "../../assets/images/phone.png";




// creating functional component ans getting props from app.js and destucturing them
const Step3 = ({ nextStep, handleFormData, prevStep, values }) => {
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
             <img src={phoneicon} width="200" height="250" alt="phone" />
            </Form.Group>


            <div style={{ display: "flex", justifyContent: "space-around" }}>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>
Waiting for 3-d secure url              </span>
              {/* <Button variant="primary" onClick={prevStep}>
                Back
              </Button>

              <Button variant="primary" type="submit">
                Process The Order
              </Button> */}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Step3;
