import React, { useState, useEffect } from "react";
// styles
import styles from "./styles.scss";
// redux
import { connect } from "react-redux";
// containers
import FullscreenLoader from "@containers/FullscreenLoader";
import { PaymentContainer } from "@containers/Payment/index.jsx";

function Paymentpage(props) {
    const [render, setRender] = useState(null)
    const [step, setStep] = useState(1)

    useEffect(() => {
        if (props.currencyes) {
            setRender(true)
        }
    }, [props]);

    return (
        <>
            {
                !render ? <FullscreenLoader /> :
                    <div className={`${styles.wrapper} ${step != 1 && styles.noFirstStep}`}>
                        <div className={styles.logo}>
                            <span>POWERED BY</span>
                            <img src={require('@images/icons/logoIndacoin.svg').default} alt="INDACOIN" />
                        </div>
                        {step === 1 && <section>
                            <div></div>
                            <div className={styles.main}>
                                <div className={styles.mainElements}>
                                    <div className={styles.titleText}>
                                        <div className={styles.titleTextUp}>
                                            <h1>Buy crypto <br />with credit card</h1>
                                        </div>
                                        <div className={styles.titleTextDown}>
                                            <h1>in the USA</h1>
                                        </div>
                                    </div>
                                    <div className={styles.buyForm}>
                                    <PaymentContainer step={(step) => setStep(step)} />
                                    </div>

                                </div>
                            </div>
                        </section>}
                    
                    </div>
            }
        </>
    )
}
export default connect(
    state => ({
        currencyes: state.currencyes
    })
)(Paymentpage);