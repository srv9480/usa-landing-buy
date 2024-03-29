import React from "react";
import { Card } from "react-bootstrap";
import { Input } from '@components/Button';
const Final = ({ values, data }) => {
  //destructuring the object from values
  const {
    firstName,
    lastName,
    stateId,
    country,
    postCode,
    amountGive,
    emailId,
    phoneId,
    cardNumber,
    walletAddress,
    stAddressOne,
    stAddressTwo,
    cardCVV,
    cardMM,
    cardYYYY,
    cityId
  } = values;
  const {amountGet} = data;
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
          <p>
            <strong>First Name :</strong> {firstName} {" "}
          </p>
          <p>
            <strong>Last Name :</strong> {lastName}{" "}
          </p>
          <p>

            <strong>Email :</strong> {emailId}{" "}
          </p>
          wallet: {walletAddress} {" "}
          amountGet: {amountGive}           amountGet: {amountGet} {" "}

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
