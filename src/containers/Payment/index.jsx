// tools
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
// styles
import styles from "./styles.scss";

// Яндеск метрика
// import {getClientID} from "@libs/yandexMetrika";

import requests from "@requests/request";

// render
import OrderData from "@containers/Payment/render/OrderData";
import ContactData from "@containers/Payment/render/ContactData";
import CardData from "@containers/Payment/render/CardData";
import WalletData from "@containers/Payment/render/WalletData";

export function PaymentContainer(props) {
    const [step, setStep] = useState(1)
    const urlParams = useParams()

    // useEffect(() => props.step(step), [step]);
    useEffect(() => {
        if (urlParams, urlParams.id, urlParams.hash) requests.ExchangeCheck(urlParams.id, urlParams.hash).then(data => { if (data) setStep(3) })
    }, [urlParams]);

    function renderForm(step, setStep, valueSelected, currencyGive, currencyGet, valueGet) {
        switch(step) {
            case 1: return (
                <OrderData valueGet={valueGet} currencyGet={currencyGet} currencyGive={currencyGive} valueSelected={valueSelected} setStep = {(step) => setStep(step)} />
            )
            // case 1: return <OrderData setStep = {(step) => setStep(step)} />;
            case 2: return (
                <WalletData valueGet={valueGet} currencyGet={currencyGet} currencyGive={currencyGive} valueSelected={valueSelected} setStep = {(step) => props.step(step)} setFormData={props.setFormData}/>            
            )
    
            // case 3: return (
            //     <WalletData valueGet={valueGet} currencyGet={currencyGet} currencyGive={currencyGive} valueSelected={valueSelected} setStep = {(step) => setStep(step)}/>            
            // )
    
            // case 4: return (
            //     <>
                   
            //         <CardData setStep = {(step) => setStep(step)} />
            //         <p className={styles.PaymentContainer__fees}>
            //             All fees included 
            //             <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                 <path d="M8.00024 15.5C3.85799 15.5 0.500244 12.1422 0.500244 8C0.500244 3.85775 3.85799 0.5 8.00024 0.5C12.1425 0.5 15.5002 3.85775 15.5002 8C15.5002 12.1422 12.1425 15.5 8.00024 15.5ZM8.00024 14C9.59154 14 11.1177 13.3679 12.2429 12.2426C13.3681 11.1174 14.0002 9.5913 14.0002 8C14.0002 6.4087 13.3681 4.88258 12.2429 3.75736C11.1177 2.63214 9.59154 2 8.00024 2C6.40894 2 4.88282 2.63214 3.7576 3.75736C2.63238 4.88258 2.00024 6.4087 2.00024 8C2.00024 9.5913 2.63238 11.1174 3.7576 12.2426C4.88282 13.3679 6.40894 14 8.00024 14ZM7.25024 10.25H8.75024V11.75H7.25024V10.25ZM8.75024 9.01625V9.5H7.25024V8.375C7.25024 8.17609 7.32926 7.98532 7.46991 7.84467C7.61056 7.70402 7.80133 7.625 8.00024 7.625C8.2133 7.62499 8.42198 7.56447 8.60199 7.4505C8.782 7.33652 8.92594 7.17377 9.01707 6.98119C9.1082 6.7886 9.14277 6.5741 9.11675 6.36263C9.09074 6.15117 9.00521 5.95144 8.87012 5.78668C8.73503 5.62193 8.55593 5.49892 8.35366 5.43198C8.15139 5.36503 7.93427 5.3569 7.72756 5.40853C7.52085 5.46016 7.33305 5.56942 7.18602 5.72361C7.03898 5.8778 6.93875 6.07057 6.89699 6.2795L5.42549 5.98475C5.51672 5.52881 5.72738 5.10528 6.03593 4.75744C6.34449 4.4096 6.73988 4.14994 7.18168 4.00499C7.62349 3.86004 8.09586 3.83501 8.5505 3.93246C9.00515 4.02991 9.42577 4.24633 9.76936 4.55962C10.1129 4.8729 10.3672 5.2718 10.5061 5.71555C10.645 6.15929 10.6635 6.63196 10.5599 7.08523C10.4562 7.5385 10.2341 7.95612 9.91613 8.2954C9.59818 8.63467 9.19584 8.88343 8.75024 9.01625Z" fill="#3463F8"/>
            //             </svg>
            //         </p>
            //     </>
            // )
        }
    }

    return (
        
        <div className={styles.PaymentContainer}>
            {renderForm(step, setStep, props.valueSelected, props.currencyGive, props.currencyGet, props.valueGet, props.setStep)}
        </div>
    )
}