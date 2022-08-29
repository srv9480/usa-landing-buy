import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
//import MaskedInput from 'react-text-mask';
//import YouGive from "@components/FormConsolidation/inputs/YouGive";


// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values, prevStep }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const normalizeCardNumber = (value) => {
    return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
  }
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
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
    <div>
      <Card style={{ marginTop: 0, border: "none" }}>
        <Card.Body>

          <Form onSubmit={submitFormData}> 
          <div style={{color: "#ec347a", marginBottom: "30px", fontWeight: "600", fontSize: "1.3125rem"}}>Payment Detals</div>
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "387", width: "105%"}}>
              <Form.Group className="mb-4">

                <Form.Control
                  style={{
                    border: error ? "2px solid red" : "",
                    borderRadius: ".625rem",
                    padding: "0.8125rem 1.25rem .75rem",
                    width: "90%"
                  }}
                  name="firstName"
                  defaultValue={values.firstName}
                  type="text"
                  placeholder="First Name"
                  onChange={handleFormData("firstName")}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    First Name is a required field
                  </Form.Text>
                ) : (
                  ""
                )}
              </Form.Group>

              {/* Last Name input */}
              <Form.Group className="mb-4">
                <Form.Control
                  style={{
                    border: error ? "2px solid red" : "",
                    borderRadius: ".625rem",
                    padding: "0.8125rem 1.25rem .75rem",
                    width: "90%"
                  }}
                  name="lastName"
                  defaultValue={values.lastName}
                  type="text"
                  placeholder="Last Name"
                  onChange={handleFormData("lastName")}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    Last Name is a required
                  </Form.Text>
                ) : (
                  ""
                )}
              </Form.Group>
            </div>
            {/* Input Email */}
            <Form.Group className="mb-4">
              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem"
                }}
                type="email"
                placeholder="email@address.com"
                onChange={handleFormData("emailId")}
                value={"dsada@dd.com"}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  email is a required
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            {/* Input Phone */}
            <Form.Group className="mb-3">

              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem"
                }}
                type="tel"
                placeholder="Phone (+1534...)"
                onChange={handleFormData("phoneId")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  Phone is a required
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            {/* Input CardNumber */}
            <Form.Group className="col-form-label-sm">
         


              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem"
                }}
                
                inputMode="numeric"
                type="tel"
                autoComplete="cc-number"
                placeholder="0000 0000 0000 0000"
                onChange={(event) => {
                  const {value} = event.target
                  event.target.value = normalizeCardNumber(value)
            handleFormData("cardNumber") 
                }}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  Card Number is a required field
                </Form.Text>
              ) : (
                ""
              )}






            </Form.Group>
             

            {/* Input Card Number */}
            <Form.Group
              className="mb-4 col-form-label-lg"
              style={{
                borderRadius: "1rem!important",
                display: "flex",

                width: "100%",
                justifyContent: "space-between"
              }}
            >
              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  width: "90px",
                  borderRadius: ".625rem",

                  paddingLeft: "1.25rem",
                }}
                type="number"
                placeholder="MM"
                onChange={handleFormData("cardMM")}
              />
              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  width: "100px",
                  borderRadius: ".625rem",
                  paddingLeft: "1.25rem",
                }}
                type="number"
                placeholder="YYYY"
                onChange={handleFormData("cardYYYY")}
              />
              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  width: "90px",
                  borderRadius: ".625rem",
                  paddingLeft: "1.25rem",
                }}
                type="number"
                placeholder="CVV"
                onChange={handleFormData("cardCVV")}
              />

            </Form.Group>
            <div
              style={{
                display: "block",
                width: "100px",
                justifyContent: "space-between"
              }}
            >
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: "325px",
                  borderRadius: "22px",
                  height: "50px",
                  marginBottom: "1rem",
                  margin: "0 auto"
                }}
              >
                Next
              </Button>
              <Button
                variant="primary"
                onClick={prevStep}
                type="submit"
                style={{
                  backgroundColor: "white",
                  marginTop: "20px",
                  border: "none",
                  color: "black",
                  fontStyle: "bold"
                }}
              >
                <svg
                  width="8"
                  height="10"
                  viewBox="0 0 8 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "5" }}
                >
                  <path
                    d="M-2.18557e-07 5L7.5 0.669872L7.5 9.33013L-2.18557e-07 5Z"
                    fill="black"
                  ></path>
                </svg>
                Go Back
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StepOne;
