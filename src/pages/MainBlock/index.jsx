import React, { useState, useEffect } from "react";

// styles
import styles from "./styles.scss";

// redux
import { connect } from "react-redux";

// Import images
import mastercard from '@assets/images/icons/mastercard.svg'
import pci from '@assets/images/icons/pci.svg'
import visa from '@assets/images/icons/visa.png'

// containers
import FullscreenLoader from "@containers/FullscreenLoader";
import { PaymentContainer } from "@containers/Payment/index.jsx";
import ModalMy from "../../components/ModalMy";
import Header from "@components/Header";
import WhyIndacoin from "@components/WhyIndacoin";
import Button from "@components/Button";
import SimpleSlide from "../../components/SliderTest";
import Partners from "@components/Partners";
import ShouldBuyBlock from "@components/ShouldBuyBlock";
import StepsBlock from "@components/StepsBlock";
import FaqSection from "@components/FaqSection";
import FooterBlock from "@components/FooterBlock";
import OrderDataTest from "../../containers/Payment/render/OrderDataTest";
//import FormSteps from "../../../FormSteps";
import FormSteps from './../../containers/FormSteps';

function Paymentpage(props) {
    const [disableButton, setDisableButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(null)
    const [step, setStep] = useState(1)
    const [isModal, setModal] = React.useState(false);
    const [valueSelected, setValueSelected] = useState(0)
    const [currencyGive, setCurrencyGive] = useState("USD")
    const [currencyGet, setCurrencyGet] = useState("BTC")
    const [valueGet, setValueGet] = useState(0)
    const [data, setData] = useState({})

    useEffect(() => {
        if (props.currencyes) {
            setRender(true)
        }
    }, [props]);

    console.log(data)
    return (
        <>
            <Header />
            {
                !render ? <FullscreenLoader /> :
                    <div className={`${styles.wrapper} ${step != 1 && styles.noFirstStep}`}>
                       <section>
                            <div></div>
                            <div className={styles.main}>

                                <div id="section1" className={styles.mainElements}>
                                    <div id="section1" className={styles.titleText}>
                                        <div className={styles.titleTextUp}>
                                            <h1>Buy crypto <br />with credit card</h1>
                                        </div>
                                        <div className={styles.titleTextDown}>
                                            <h1>in the USA</h1>
                                        </div>
                                    </div>
                                    <div className={styles.buyForm}>
                                        <OrderDataTest
                                            setValueSelected={setValueSelected}
                                            setCurrencyGive={setCurrencyGive}
                                            setCurrencyGet={setCurrencyGet}
                                            setValueGet={setValueGet}
                                            setData={setData}
                                            setModal={setModal}
                                            loading={loading}
                                        />

                                        
                                    </div>
                                </div>
                            </div>
                        </section>
                        <ModalMy
                            isVisible={isModal}
                            title={"Buy Crypto"}
                            content={
                                <FormSteps data={data}
                                setData={setData}/>
                                 // <PaymentContainer
                                 //     valueSelected={valueSelected}
                                 //     currencyGive={currencyGive}
                                 //     currencyGet={currencyGet}
                                 //     valueGet={valueGet}
                                 //     step={(step) => setStep(step)}
                                 // />
                            }
                            onClose={() => setModal(false)}
                        />
                    </div>
            }
            <div className='wrapper'>
                <div style={{ width: "100%" }}>
                    <WhyIndacoin />
                    <SimpleSlide />
                    <Partners />
                    <ShouldBuyBlock />
                    <StepsBlock />
                    <FaqSection />
                </div>
            </div>
            <FooterBlock />
        </>
    )
}
export default connect(
    state => ({
        currencyes: state.currencyes
    })
)(Paymentpage);



                                // <PaymentContainer
                                //     valueSelected={valueSelected}
                                //     currencyGive={currencyGive}
                                //     currencyGet={currencyGet}
                                //     valueGet={valueGet}
                                //     step={(step) => setStep(step)}
                                // />