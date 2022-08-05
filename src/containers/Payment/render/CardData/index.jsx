import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

styles
import styles from "./styles.scss";

// redux
import {connect} from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";

// components
import CardNumber       from "@components/FormConsolidation/inputs/CardNumber";
import ValidThru        from "@components/FormConsolidation/inputs/ValidThru";
import FullNameCard     from "@components/FormConsolidation/inputs/FullNameCard";
import Cvc              from "@components/FormConsolidation/inputs/Cvc";
import InputChecked     from "@components/InputChecked";
import Button           from "@components/Button"
import Trustpayments from "@containers/Payment/Trustpayments";
import ClipLoader from "react-spinners/ClipLoader";

// request
import requests from "@requests/request";

// img
import mastercard from '@assets/images/icons/mastercard.svg'
import pci from '@assets/images/icons/pci.svg'
import visa from '@assets/images/icons/visa.png'

function OrderData(props) {
    const [checkedPolicy, setCheckedPolicy] = useState(false)
    const [checkedAge, setCheckedAge] = useState(false)
    const [checkedDark, setCheckedDark] = useState(false)
    const [TrustpaymentsJWT, setTrustpaymentsJWT] = useState(null)
    const [cashinPaymentId, setCashinPaymentId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [disabledNext, setDisabledNext] = useState(null)
    const urlParams = useParams()

    useEffect(() => {
        if (urlParams.id && urlParams.hash) props.action_getInstanceState({value_exchangeRequestId: urlParams.id, value_exchangeRequestHash: urlParams.hash})
    }, [urlParams]);

    useEffect(() => {
        if (checkedPolicy && checkedAge && checkedDark) checkAgreements()
    }, [checkedPolicy, checkedAge, checkedDark]);

    function checkAgreements() {
        if (checkedPolicy && checkedAge && checkedDark && !props.getInstanceState.check_agreement) {
            props.action_getInstanceState({ check_agreement: true });
        } else {
            props.action_getInstanceState({ check_agreement: null });
        }
    }

    function disabledNextButton() {
        if (
            props.getInstanceState.value_cardNumber
            && props.getInstanceState.value_validThru
            && props.getInstanceState.value_cvc
            && props.getInstanceState.value_fullNameCard
            && props.getInstanceState.check_agreement
        ) return false
        return true
    }

    function backStep() {
        if (props.getInstanceState.verify_contact) return props.setStep(1)
        props.setStep(2)
    }

    function submitData() {
        const {
            value_exchangeRequestId,
            value_exchangeRequestHash,
            value_cardNumber,
            value_validThru,
            value_cvc,
            value_fullNameCard
        } = props.getInstanceState
        const card = {
            cardNumber:  value_cardNumber?.split(' ').join(''),
            cardHolder: value_fullNameCard,
            cvv: value_cvc,
            cardExpiryMonth: value_validThru?.split(' / ')[0],
            cardExpiryYear: value_validThru?.split(' / ')[1]
        }
        // Отправка данных карты и получение 3ds
        setLoading(true)
        setDisabledNext(true)
        requests.Cashin(value_exchangeRequestId, value_exchangeRequestHash, card).then(responce =>{
            setLoading(false)
            // error Fraud NotEnoughBalance Success

            if (responce.result === 'Fraud') {
                setError(responce.description)
                console.log(responce)
            }

            if (responce.result === 'NotEnoughBalance') {
                setError(responce.description)
                setDisabledNext(false)
            }

            if (responce.result === 'Error') {
                setError(responce.description)
                setDisabledNext(false)                
            }

            if (responce.result === 'Success') {
                if (responce.data.return3DSType === "JWT") {
                    setTrustpaymentsJWT(responce.data.responseValue)
                    setCashinPaymentId(responce.data.сashinPaymentId)
                }
                if (responce.data.responseValue?.indexOf('<form ') === 0) {
                    let div = document.createElement('div');
                    div.setAttribute('id', 'Connectum');
                    div.innerHTML = responce.data.responseValue;
                    div.style.cssText = `overflow: hidden; width: 0; height: 0;`;
                    document.body.appendChild(div);
                    document.body.querySelector('div#Connectum form').submit();
                }
            }            
        }).catch(error => {
            if (error.response.status === 400) setError(error.response.data)
        })
    }

    return (
        <>
            {
            (TrustpaymentsJWT && cashinPaymentId) ?

            <Trustpayments
                token={TrustpaymentsJWT}
                cash_in_payment_id={cashinPaymentId}
                exchangeRequestId={props.getInstanceState.value_exchangeRequestId}
                exchangeRequestHash={props.getInstanceState.value_exchangeRequestHash}/> :

            <div className={styles.cardData}>                
                <div className={styles.cardData__header}>
                    <span>Enter your card details</span>
                    <div className={styles.cardData__logoGroup}>
                        <img src={pci} alt="PCI" className={styles.pci}/>
                        <img src={visa} alt="visa" className={styles.visa}/>
                        <img src={mastercard} alt="mastercard" className={styles.mastercard}/>
                    </div>
                </div>
                {
                    error &&
                    <span style={{color: 'red', marginBottom: 20, marginTop: -15}}>{error}</span>
                }
                <div className={styles.wrapper__Input}>
                    <div className={styles.rowTop__Input}>
                        <CardNumber />
                        <ValidThru />
                    </div>
                    <div className={styles.rowBottom__Input}>
                        <FullNameCard />
                        <Cvc />
                    </div>
                </div>
                <div className={styles.wrapper__checkbox}>
                    <InputChecked 
                    value={ () => checkedPolicy}
                    label={'I agree to the Term of Use and Privacy Policy'}
                    error={null}
                    onChange={(bool) => setCheckedPolicy(bool)}
                    />
                    <InputChecked
                    value={ () => checkedAge}
                    label={'I confirm that I am over 18 years old'}
                    error={null}
                    onChange={(bool) => setCheckedAge(bool)}
                    />
                    <InputChecked
                    value={ () => checkedDark}
                    label={'I confirm that I am not depositing crypto to Forex, Gambling, Pharmacy, Steroid websites, Antivirus, Dark market etc.'}
                    error={null}
                    onChange={(bool) => setCheckedDark(bool)}
                    />
                </div>
                <div className={styles.cardData__buttonBlock}>
                    <Button type={'button'} onClick={() => backStep()} disabled={false} className={'text'} title={'< Back'}>
                        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.999999 7L0.292892 6.29289C0.105355 6.48043 -1.39974e-06 6.73478 -1.34048e-06 7C-1.28123e-06 7.26522 0.105356 7.51957 0.292892 7.70711L0.999999 7ZM7.70711 1.70711C8.09763 1.31658 8.09763 0.683418 7.70711 0.292893C7.31658 -0.0976319 6.68342 -0.0976317 6.29289 0.292893L7.70711 1.70711ZM6.2929 13.7071C6.68342 14.0976 7.31659 14.0976 7.70711 13.7071C8.09763 13.3166 8.09763 12.6834 7.70711 12.2929L6.2929 13.7071ZM1.70711 7.70711L7.70711 1.70711L6.29289 0.292893L0.292892 6.29289L1.70711 7.70711ZM7.70711 12.2929L1.70711 6.29289L0.292892 7.70711L6.2929 13.7071L7.70711 12.2929Z" fill="#3463F8"/>
                        </svg> Back
                    </Button>
                    <Button type={'button'} onClick={() => submitData()} disabled={disabledNextButton() || disabledNext} className={'button'} title={'Buy'}>
                        {loading && <ClipLoader color={'#fff'} size={20} />}
                    </Button>
                </div>
            </div>
            }            
        </>
    )
}

export default connect(
    state => ({
        getInstanceState: state.getInstanceState
    }),
    dispatch => ({
        action_getInstanceState: (obj) => {
            dispatch(action_getInstanceState(obj));
        }
    })
)(OrderData);
