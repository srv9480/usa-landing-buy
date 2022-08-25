import React from "react";
import { Card } from "react-bootstrap";

const Final = ({ values, data }) => {
  //destructuring the object from values
  const {
    firstName,
    lastName,
    stateId,
    country,
    postCode,
    emailId,
    phoneId,
    cardNumber,
    stAddressOne,
    stAddressTwo,
    cardCVV,
    cardMM,
    cardYYYY,
    cityId
  } = values;
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
          <p>
            <strong>First Name :</strong> {data.formData.firstName}{" "}
          </p>
          <p>
            <strong>Last Name :</strong> {lastName}{" "}
          </p>
          <p>
            <strong>Email :</strong> {emailId}{" "}
          </p>
          phoneId {phoneId} {""},<p />
          cardNumber {cardNumber} {""},<p />
          cardMM {cardMM} {""},<p />
          cardYYYY {cardYYYY} {""},<p />
          cardCVV {cardCVV} {""},<p />
          stAddressOne {stAddressOne} {""},<p />
          stAddressTwo {stAddressTwo} {""},<p />
          country {country} {""},<p />
          stateId {stateId} {""},<p />
          postCode {postCode} {""},<p />
          cityId {cityId} {""}
        </Card.Body>
      </Card>
    </>
  );
};

export default Final;
