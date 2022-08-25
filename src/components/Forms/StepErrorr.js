import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

import imgtest from "../../assets/images/arrows-circle.png";




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
            <div style={{ color: "#ec347a", marginBottom: "30px", fontWeight: "600", fontSize: "1.3125rem" }}>Payment Confirmation</div>
            <Form.Group className="mb-3">
              <div style={{display: "block"}}>
              <img src={imgtest} width="60" height="55" alt="Payment"></img>
              <span style={{ fontSize: '16px', fontWeight: '500', display: "block", marginBottom: "25px"}}>
                Rates and gas fee could change every minute, so refresh data for better perfomance
              </span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: '600', color: "red", marginTop: "0.3rem" }}>Destination Wallet</span>
              <Form.Control
              
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem",
                  marginBottom: "0.7rem",

                }}
                type="text"
                placeholder="значение кошелька"
                onChange={handleFormData("walletId")}
              />
             {/* <span style={{ fontSize: '16px', fontWeight: '500' }}>Destination Wallet</span> */}
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}

<span style={{ fontSize: '20px', fontWeight: '600', color: "red", marginTop: "0.3rem", marginBottom: "0.3rem" }}>CardNumber</span>
              <Form.Control
              
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem",
                  marginBottom: "0.7rem",

                }}
                type="text"
                placeholder="значение карты"
                onChange={handleFormData("walletId")}
              />
             {/* <span style={{ fontSize: '16px', fontWeight: '500' }}>Destination Wallet</span> */}
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}

            </Form.Group>


            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "0.5rem" }}>
              <Button variant="primary" onClick={prevStep}>
                Back
              </Button>

              <Button variant="primary" type="submit">
                Process The Order
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Step3;
