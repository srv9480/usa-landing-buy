// tools
// import React, {Expansion} from "@tools/ReactExpansion";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// styles
import styles from "./styles.scss";

// containers
import FullscreenLoader from "@containers/FullscreenLoader";
import Status from "@containers/Status";

// components
import Stepper from '@components/Stepper'

// redux
import {connect} from "react-redux";
import action_getInstanceStateStatus from "@redux/actions/getInstanceStateStatus";

// request
import exchangeRequest from "@requests/request.jsx";

function StatusPage(props) {
    const params = useParams()
    const navigate = useNavigate()
    const exchangeRequestId = params.id
    const exchangeRequestHash = params.hash
    const cashinPaymentId = params.cashinId

    const [render, setRender] = useState(null);
    const [step, setStep] = useState(4);

    
    useEffect(() => {
        if (params) checkStatus3ds()
    }, [params])
    
    function checkStatus3ds() {
        exchangeRequest.CashinCheck(cashinPaymentId).then(responce => {
            if (responce.result === 'Success') checkDataPayment()
            else if (responce.result === 'Fraud') setRender(false)
            else {
                navigate(`/${exchangeRequestId}/${exchangeRequestHash}/${responce.result}`, { replace: true });
            }
        })
    }

    function checkDataPayment() {
        if (exchangeRequestId && exchangeRequestHash)
            setInterval(() =>
                exchangeRequest.ExchangeCheck(exchangeRequestId, exchangeRequestHash).then(response => {
                    props.action_getInstanceStateStatus({
                        statusCashin: response.status,
                        exchangeRequestId: response.id,
                        hash: response.hash,
                        amountInCashin: response.amountOutDisplayed,
                        amountIn: response.amountIn,
                        currencyIn: response.currencyIn,
                        currencyOut: response.currencyOut,
                        networkId: response.networkId,
                        cryptoAddress: response.cryptoAddress,
                        createdAt: response.createdAt,
                    });
                setRender(true)
        }), 5000)
    }

    const renderPage = (render) => {
        switch(render) {
            case null: return <FullscreenLoader />;
            case true: return page(step, setStep);
            case false : return error3ds(errorCode3ds, errorMessage3ds)
        }
    }

    return (
        renderPage(render)
    )
}

const page = (step, setStep) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <span>POWERED BY</span>
                <img src={require('@images/icons/logoIndacoin.svg').default} alt="INDACOIN"/>
            </div>
            <main>
                <Stepper step={step} />
                {
                    step === 4 &&
                    <p>Please take a selfie to confirm that you’re making a purchase on your own. <a>Why?</a></p>
                }
                <Status step={(step) => setStep(step)}/>
            </main>
        </div>
    );
}

const error3ds = () => {
    return (
        <div className={styles.wrapper_errorBox}>
            <div className={styles.errorBox}>
                <span>Transaction rejected by the bank</span>           
            </div>
        </div>
    )
}

export default connect(
    state => ({
        getInstanceStateStatus: state.getInstanceStateStatus
    }),
    dispatch => ({
        action_getInstanceStateStatus: (obj) => {
            dispatch(action_getInstanceStateStatus(obj));
        }
    })
)(StatusPage);