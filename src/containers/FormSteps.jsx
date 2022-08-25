import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import StepOne from "@components/Forms/StepOne";
import StepTwo from "@components/Forms/StepTwo";
import Step3 from "@components/Forms/Step3";
import Step4 from "@components/Forms/Step4";
//import StepThree from "@components/Forms/StepThree";
import Final from "@components/Forms/Final";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaymentContainer } from "@containers/Payment/index.jsx";
//import OrderData from "./Payment/render/OrderData"
//import OrderDataTest from "./Payment/render/OrderDataTest";
//import StepTwotest from "@components/Forms/StepThreetrue";


// function renderForm(step, setStep, valueSelected, currencyGive, currencyGet, valueGet) {
//   switch(step) {
//       case 1: return (
//           <OrderData valueGet={valueGet} currencyGet={currencyGet} currencyGive={currencyGive} valueSelected={valueSelected} setStep = {(step) => setStep(step)} />
//       )


function FormSteps (props) {
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneId: "",
    cardNumber: "",
    cardMM: "",
    cardYYYY: "",
    cardCVV: "",
    stAddressOne: "",
    stAddressTwo: "",
    country: "",
    stateId: "",
    postCode: "",
    cityId: "", 
    walletAddress: ""
  });

  console.log(formData)

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
    props.setData(((prevState) => ({
      ...prevState,
      formData
    })))
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input) => (e) => {
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value
    }));
  };

  // javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
 
    case 1:
      return (
        <div className="AppA">
          <Container>
            <Row>
              <Col md={{ span: 12, border: "none" }} className="custom-margin">      
              <PaymentContainer valueSelected={props.valueSelected}
                                     currencyGive={props.currencyGive}
                                     currencyGet={props.currencyGet}
                                     valueGet={props.valueGet}
                                     setFormData={setFormData}
                                 step={(step) => setstep(step)}/>
              </Col>
            </Row>
          </Container>
        </div>
      );

      case 2:
      return (
        <div className="AppA">
          <Container>
            <Row>
              <Col md={{ span: 12, border: "none" }} className="custom-margin">      
                <StepOne
                  nextStep={nextStep}
                  handleFormData={handleInputData}
                  values={formData}
                /> 
              </Col>
            </Row>
          </Container>
        </div>
      );
    
  
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="AppA">
          <Container>
            <Row>
              <Col md={{ span: 12, border: "none" }} className="custom-margin">
                <StepTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
      // Степ с круглой стрелкой, передаются {adressWallet} и {cardNumber}
      // case 3:
      //   return (

      //     <div className="AppA">
      //       <Container>
      //         <Row>
      //           <Col md={{ span: 6, offset: 3 }} className="custom-margin">
      //             <StepTwotest
      //             nextStep={nextStep}
      //             prevStep={prevStep}
      //             //value={formData}
      //             //handleFormData={handleInputData}                                   
      //             />
      //           </Col>
      //         </Row>
      //       </Container>

      //     </div>
      //   );
    // Only formData is passed as prop to show the final value at form submit


    case 3:
      return (
        <div className="AppA">
          <Container>
            <Row>
              <Col md={{ span: 12, border: "none" }} className="custom-margin">
                <Step3
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );


      // case 4:
      // return (
      //   <div className="AppA">
      //     <Container>
      //       <Row>
      //         <Col md={{ span: 12, border: "none" }} className="custom-margin">
      //           <Step4
      //             nextStep={nextStep}
      //             prevStep={prevStep}
      //             handleFormData={handleInputData}
      //             values={formData}
      //           />
      //         </Col>
      //       </Row>
      //     </Container>
      //   </div>
      // );



    case 4:
      return (
        <div className="AppA">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <Final data={props.data} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
      
    // default case to show nothing
    default:
      return <div className="AppA"></div>;
  }
}

export default FormSteps;
