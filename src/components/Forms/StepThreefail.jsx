import circle from "../../assets/images/arrows-circle.png";
import React from "react";
import { Form, Card, Button } from "react-bootstrap";
import "styles.css";
import imgtest from "../../assets/images/arrows-circle.png";

const StepThree = ({ nextStep, prevStep }) => {

      return (
            <div>
                  <Card style={{ margin: 0, border: "none" }}>
                        <Card.Body>
                              <div className="stepThreeMain">
                                    <div style={{ display: 'block' }}>
                                          <span style={{ fontSize: '16px', fontWeight: '500' }}>
                                                Rates and gas fee could change every minute, so refresh data for better perfomance
                                          </span>
                                          <src url={circle} width={45} height={30} />
                                    </div>
                                    <div className="walletInfo">
                                          <span style={{ display: "block" }}>
                                                Destination Wallet
                                          </span>
                                          <div>
                                                { }
                                          </div>
                                    </div>
                              </div>
                        </Card.Body>
                  </Card>
            </div>
      )
}

export default StepThree;