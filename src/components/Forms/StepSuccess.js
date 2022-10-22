import React, { useEffect, useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import "./stepSuccess.css";


import successCheck from "@assets/images/successCheck.png";
import loadingStatus from "@assets/images/loadingStatus.png";
import errorStatus from "@assets/images/errorStatus.png";
import trustIcon from "@assets/images/trust-icon.png";

import axios from "axios"



// creating functional component ans getting props from app.js and destucturing them
const StepSuccess = ({ nextStep, handleFormData, prevStep, values, responsOrder }) => {
  const[orderId, setOrderId] = useState()


  console.log(responsOrder)

  useEffect(() => {
    if(responsOrder){
      axios.get(`https://usaapi.indacoin.io/${responsOrder.id}`, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'accept': "*/*",
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        .then(res => {
          setOrderId(res.data)

    })
    }
  }, [responsOrder])
  //creating error state for validation
  const [error, setError] = useState(false);

  // Function
  // const {
  //   generateOrderId = 'null'
  // } = data;

  const checkStatus = () => {
    axios.get(`https://usaapi.indacoin.io/${responsOrder.id}`, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'accept': "*/*",
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        .then(res => {
          setOrderId(res.data)

    })
  }


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
   if (values.addressWallet.length > 40) {
    var str = values.addressWallet.slice(0, 10) + '...' + values.addressWallet.slice(-10);
  }
  console.log(str)
  return (
    <>
      <Card style={{ marginTop: "-30px", border: "none" }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <div style={{ color: "#ec347a", marginBottom: "30px", fontWeight: "600", fontSize: "1.3125rem" }}> </div>
            <Form.Group className="mb-3">
              <div style={{ display: "flex", position: "relative", alignItems: "center" }}>
                <img src={orderId && (orderId.status == "RUNNING_CHECKS" ? null : orderId.status == "COMPLETE" ? successCheck : errorStatus)} width="15" height="15" alt="" style={{ display: "flex" }} />
                <span style={{ paddingLeft: "0.5rem" }}>{orderId && (orderId.status == "RUNNING_CHECKS" ? "Your purchase is in progress..." : orderId.status == "COMPLETE" ? "Success! Your Purchased..." : "Something went wrong")}</span>
              </div>
            </Form.Group>


            <div className="success__hero_container">
              {responsOrder && <h3>Wallet Order ID: {responsOrder.id} </h3>}
              <div className="main__content">
                <div className="content_item"><span>Payment method:</span><span>{values.cardNumber} </span></div>
                <div className="content_item" style={{display: "flex", justifyContent: "space-between"}}><span>Sent To: </span><span>{str}</span></div>
                <div className="content_item" style={{display: "flex", justifyContent: "space-between"}}><span>{values.selectedYouGet} Received: </span><span>{values.amountGet.toFixed(5)} {values.selectedYouGet}</span></div>
                <div className="content_item" style={{display: "flex", justifyContent: "space-between"}}><span>{values.amountGet.toFixed(5)} {values.selectedYouGet}: </span><span>{values.selectedYouGive} {values.amountGive}</span></div>
              </div>
            </div>




            <div className="button_container">
              <div className="up_text" style={{marginTop: "40px"}}>
                <span>To access your crypto, processed yo your wallet aplication </span>
              </div>
              <Button onClick={checkStatus} variant="primary" style={{width: "100%", height: "50px", marginBottom: "0.7rem", marginTop:"0.5rem", borderRadius: "14px"}} >
                Track transaction status
              </Button>

              <Button variant="primary" style={{width: "100%", height: "50px", borderRadius: "14px"}}>
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
