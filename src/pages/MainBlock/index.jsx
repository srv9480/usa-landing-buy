import React, { useState, useEffect } from "react";

// styles
import styles from "./styles.scss";

// redux
import { connect } from "react-redux";
import axios from "axios"

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
    const [valueSelected, setValueSelected] = useState(100)
    const [currencyGive, setCurrencyGive] = useState("USD")
    const [currencyGet, setCurrencyGet] = useState("BTC")
    const [valueGet, setValueGet] = useState(0)
    const [data, setData] = useState({})
    const [fiat, setFiat] = useState({})
    const [crypto, setCrypto] = useState()
    const [needCrypto, setNeedCrypto] = useState({});
    const [needFiat, setNeedFiat] = useState({});
    const [showCrypto, setShowCrypto] = useState()
    const [showFiat, setShowFiat] = useState()

    console.log(valueSelected)

    useEffect(() => {
        axios.get(`https://usaapi.indacoin.io/Currencies/all`,{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'accept': "*/*",
            'Content-Type': 'application/x-www-form-urlencoded'
          })
            .then(res => {
                setFiat(res.data.fiat)
        })
        axios.get(`https://usaapi.indacoin.io/Currencies/all`,{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'accept': "*/*",
            'Content-Type': 'application/x-www-form-urlencoded'
          })
            .then(res => {
                setCrypto(res.data.crypto)
        })
       
    }, [])

    useEffect(() => {
        axios.get(`https://usaapi.indacoin.io/Currencies/fiat/USD/pairs`,
        {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'accept': "*/*",
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        .then(res => {
            setNeedCrypto(res.data)
            var result = crypto.filter(function (el) {
                return res.data.indexOf(el.symbol) >= 0; 
              });
              setShowCrypto(result)
    })
    }, [crypto])

    useEffect(() => {
        axios.get(`https://usaapi.indacoin.io/Currencies/crypto/BTC/pairs`, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'accept': "*/*",
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        .then(res => {
            setNeedFiat(res.data)
            var result = fiat.filter(function (el) {
                return res.data.indexOf(el.symbol) >= 0; 
              });
              setShowFiat(result)
    })
    }, [fiat])

    useEffect(() => {
        if (props.currencyes) {
            setRender(true)
        }
    }, [props]);

    return (
        <>
            <Header />
            {
                !render ? <FullscreenLoader /> :
                    <div>
                       <section>
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
                                    <div id="section1" className={styles.buyForm}>
                                        {fiat && showCrypto &&
                                        <OrderDataTest
                                            setValueSelected={setValueSelected}
                                            setCurrencyGive={setCurrencyGive}
                                            setCurrencyGet={setCurrencyGet}
                                            setValueGet={setValueGet}
                                            setData={setData}
                                            setModal={setModal}
                                            loading={loading}
                                            fiat={fiat}
                                            crypto={crypto}
                                            needCrypto={needCrypto}
                                            setNeedCrypto={setNeedCrypto}
                                            setShowCrypto={setShowCrypto}
                                            showCrypto={showCrypto}
                                            needFiat={needFiat}
                                            setNeedFiat={setNeedFiat}
                                            setShowFiat={setShowFiat}
                                            showFiat={showFiat}
                                        />
}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <ModalMy
                            isVisible={isModal}
                            title={"Buy Crypto"}
                            content={
                                <FormSteps data={data}
                                setData={setData}
                                valueSelected={valueSelected}
                                     currencyGive={currencyGive}
                                     currencyGet={currencyGet}
                                     valueGet={valueGet}/>
                                //  <PaymentContainer
                                //      valueSelected={valueSelected}
                                //      currencyGive={currencyGive}
                                //      currencyGet={currencyGet}
                                //      valueGet={valueGet}
                                //      step={(step) => setStep(step)}
                                //  />
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



                            