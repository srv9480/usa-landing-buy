import React, { useState, useEffect } from "react";
// styles
import styles from "./styles.scss";
// redux
import { connect } from "react-redux";
// containers
import FullscreenLoader from "@containers/FullscreenLoader";
import { PaymentContainer } from "@containers/Payment/index.jsx";
import ModalMy from "../../components/ModalMy";
import Button from "@components/Button";
import OrderDataTest from "../../containers/Payment/render/OrderDataTest";
function Paymentpage(props) {
    const [disableButton, setDisableButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(null)
    const [step, setStep] = useState(1)
    const [isModal, setModal] = React.useState(false);
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
                                        <OrderDataTest />
                                        <Button type={'button'} onClick={() => setModal(true)} loading={loading} disabled={false} className={'button'}>Buy Crypto Now</Button>

                                    </div>
                                </div>
                            </div>
                        </section>}
                        <ModalMy
                            isVisible={isModal}
                            title={"Buy Crypto"}
                            content={<PaymentContainer step={(step) => setStep(step)} />}
                            onClose={() => setModal(false)}
                        />
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