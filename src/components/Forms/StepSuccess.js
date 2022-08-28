import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import "./stepSuccess.css";


import successCheck from "@assets/images/successCheck.png";
import trustIcon from "@assets/images/trust-icon.png";





// creating functional component ans getting props from app.js and destucturing them
const StepSuccess = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // Function
  // const {
  //   generateOrderId = 'null'
  // } = data;


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
            <div style={{ color: "#ec347a", marginBottom: "30px", fontWeight: "600", fontSize: "1.3125rem" }}> </div>
            <Form.Group className="mb-3">
              <div style={{ display: "flex", position: "relative" }}>
                <img src={successCheck} width="15" height="15" alt="" style={{ display: "flex" }} />
                <span>Success! Your Purchased...</span>
              </div>
            </Form.Group>


            <div className="success__hero_container">
              <h3 style={{}}>{`{Wallet Order ID: }`} {`{generateOrderId}`} </h3>
              <div className="main__content">
                <div className="content_item"><span>Payment method: </span></div>
                <div className="content_item"><span>Sent To: </span></div>
                <div className="content_item"><span>LETH Received: </span></div>
                <div className="content_item"><span>Payment method: </span></div>
                <div className="content_item"><span>WYRE fees: </span></div>
                <div className="content_item"><span>Network fees: </span></div>
                <div className="content_item"><span>Total USD Pald: </span></div>
              </div>
            </div>

            <div className="under_text">
              <img src={trustIcon} width="15" height="15" alt="trustpilot" style={{ display: "flex" }} />
              <h3 style={{}}>{`{Trustpilot: }`} </h3><a href="./">How did we do?</a>
            </div>



<div className="button_container">
            <Button variant="primary" onClick={""} >
              Track transaction status
            </Button>

            <Button variant="primary" type="submit">
              Return to home
            </Button>
</div>


          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepSuccess;
