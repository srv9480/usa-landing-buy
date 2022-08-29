import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";







// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
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
          <div style={{color: "#ec347a", marginBottom: "30px", fontWeight: "600", fontSize: "1.3125rem"}}>Payment Detals</div>
            <Form.Group className="mb-3">

              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem",
                  marginBottom: "0.7rem",

                }}
                type="text"
                placeholder="Street Address 1"
                onChange={handleFormData("stAddressOne")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem",
                  marginBottom: "0.7rem",

                }}
                type="text"
                placeholder="Street Address 2"
                onChange={handleFormData("stAddressTwo")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}

              <Form.Select aria-label="Default select example" style={{

                borderRadius: ".625rem",
                padding: "0.8125rem 1.25rem .75rem",
                marginBottom: "0.7rem",
      
              }}
              onChange={handleFormData("countryId")}
              >
              
                <option>Country</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>


              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}

<Form.Select aria-label="Default select example" style={{

borderRadius: ".625rem",
padding: "0.8125rem 1.25rem .75rem",
marginBottom: "0.7rem",
width: "50%",
}}
onChange={handleFormData("stateId")}
>

<option>State</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three</option>
</Form.Select>


{error ? (
<Form.Text style={{ color: "red" }}>
  This is a required field
</Form.Text>
) : (
""
)}

              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem",
                  marginBottom: "0.7rem",
                  width: "50%",
                }}
                type="text"
                placeholder="Post Code"
                onChange={handleFormData("postId")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                style={{
                  border: error ? "2px solid red" : "",
                  borderRadius: ".625rem",
                  padding: "0.8125rem 1.25rem .75rem",
                  marginBottom: "0.7rem",

                }}
                type="text"
                placeholder="City"
                onChange={handleFormData("cityId")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
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
                  width: "300px",
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
    </>
  );
};

export default StepTwo;
