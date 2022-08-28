import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

import imgtest from "../../assets/images/arrows-circle.png";
import imgBack from "../../assets/images/united-states.png";



// creating functional component ans getting props from app.js and destucturing them
const Step3 = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const { walletAddress, cardNumber, cardMM, cardYYYY } = values;
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
              <div className="confirmation_main" style={{ display: "block", backgroundImage: '../../assets/images/united-states.png' }}>
                <img src={imgtest} width="60" height="55" alt="Payment"></img>
                <span style={{ fontSize: '16px', fontWeight: '500', display: "block", marginBottom: "25px" }}>
                  Rates and gas fee could change every minute, so refresh data for better perfomance
                </span>
              </div>
              <div style={{ display: "block", textAlign: "start", borderTop: "1px solid #00000063", borderBottom: "1px solid #00000063", padding: "0.73rem" }}>
                <span style={{ fontSize: '20px', fontWeight: '500', color: "red", marginTop: "0.3rem" }}>Destination Wallet: </span>
                <span style={{ display: 'block', marginTop: '0.25rem' }}>   {walletAddress} {""}</span>

              </div>

              <div style={{ display: "block", textAlign: "start", padding: "0.73rem" }}>
                <span style={{ fontSize: '20px', fontWeight: '500', color: "red", marginTop: "0.3rem", marginBottom: "0.3rem" }}>Card: </span>
                <span style={{ display: 'block', marginBottom: '0.5rem', marginTop: '0.25rem' }}>   {cardNumber} {""}</span> <span> {`${cardMM} / ${cardYYYY}`}</span>

              </div>
              <div className="custom-control custom-checkbox" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" for="customCheck1">I accept <a href="https://www.sendwyre.com/legal/user-agreement">Wyre`s User Agreement</a></label>
              </div>

            </Form.Group>


            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "0.5rem", marginTop: '1rem' }}>
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
