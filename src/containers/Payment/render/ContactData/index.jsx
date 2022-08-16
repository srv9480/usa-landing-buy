// tools
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.scss";
import { connect } from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";

// components
import Button from "@components/Button";

import { Input } from '@components/Button';
import MessageBox from '@components/MessageBox';

import { Phone, Email, VerifyContact } from '@components/Contact'


// request
import ContactRequest from '@requests/payment/ContactRequest';


const ContactData = (props) => {
    const [searchParams] = useSearchParams();
    const query = [...searchParams.entries()]
        .reduce((acc, val) => {
            const [key, value] = val
            return { ...acc, [key]: value }
        }, {})
    const [errorCode, setErrorCode] = useState(null)
    const [step, setStep] = useState('Contact')
    const [toggleMenu, setToggleMenu] = useState(false)
    const [typeContact, setTypeContact] = useState('Email')

    const [valueEmail, setValueEmail] = useState(null)
    const [valuePhone, setValuePhone] = useState(null)

    const [errorContact, setErrorContact] = useState(null)
    const [errorVerify, setErrorVerify] = useState(null)
    const [country, setCountry] = useState(props.countries.find((country) => country.alpha2 === window.navigator.language.slice(0, 2).toUpperCase()))
    const [verifyCode, setVerifyCode] = useState(null)
    const [loading, setLoading] = useState(false)
    const [contactId, setContactId] = useState(null)

    const [addressWallet, setAddressWallet] = useState(null)
    const [errorWallet, setErrorWallet] = useState(false)
    const [disabledWallet, setDisabledWallet] = useState(false)


    useEffect(() => {
        if (query.email) {
            setTypeContact('Email')
            validateEmail(query.email)
        }
    }, [])
    // переключение типа контакта
    useEffect(() => {
        if (typeContact === 'Email' && valueEmail) validateEmail(valueEmail)
        if (typeContact === 'Phone' && valuePhone) validatePhone(valuePhone)
    }, [typeContact])

    function validateEmail(value) {
        setValueEmail(value)
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
            setErrorContact(null)
        } else setErrorContact('Incorrect email address')
    }

    function validateWallet(value) {
        setAddressWallet(value)
        const youGet = props.currencyes.crypto.find((curr) => curr.shortName === selectedYouGet)
        const valueRegExp = youGet.networks.find((network) => network.shortName === activeNetwork) || youGet.networks[0]
        if (valueRegExp && RegExp(valueRegExp.addressVerificationRegExp).test(value)) setErrorWallet(false)
        else {
            setErrorWallet(true)
            setDisabledWallet(false)
        }
    }


    function validatePhone(value) {
        setValuePhone(value)
        if (value) return setErrorContact(null)
        setErrorContact('Incorrect phone number')
    }

    const checkPinCode = pinCode => {
        if (pinCode.length === 6 && pinCode != verifyCode) {
            setVerifyCode(pinCode)
            disableNextButton(true)
            ContactRequest.Verify(
                props.getInstanceState.value_tradeUserId,
                contactId,
                pinCode)
                .then(response => {
                    if (response.status === 200) {
                        props.action_getInstanceState({ verify_contact: true })
                        nextStep()
                    }
                }).catch(error => {
                    if (error.response.status === 400) {
                        setErrorVerify(error.response.data)
                    } else {
                        setErrorVerify('internal Server Error')
                    }
                }
                )
        }
    }
    const getNewCode = () => {
        ContactRequest.Sendcode(props.getInstanceState.value_tradeUserId, contactId)
            .then((response) => { console.log(response) })
            .catch(error => { console.log(error) })
    }

    function nextStep() {
        if (step === 'Contact') {
            setLoading(true)
            let contact
            if (typeContact === 'Phone') contact = valuePhone
            else contact = valueEmail
            ContactRequest.AddContacts(
                props.getInstanceState.value_tradeUserId, typeContact, contact).then(response => {
                    setStep('Verify')
                    setContactId(response.id)
                    setLoading(false)
                    setErrorVerify(null)
                }).catch(error => {
                    if (error.response.status === 400) setErrorContact(error.response.data)
                    else if (error.response.status === 500) setErrorContact('One or more fields are filled out incorrectly')
                    else if (error.response.status === 429) setErrorContact('Too many requests. Please wait a minute and try again')
                    else setErrorContact('internal Server Error')
                    setLoading(false)
                })
        } else props.setStep(4)
    }

    function backStep() {
        if (step === 'Verify') {
            console.log(this)
            setStep('Contact')
        } else {
            props.setStep(1)
        }
    }
    function disableNextButton(bool){
        if (bool == "verify") return false
        if (loading) return true
        if (step === 'Contact' && typeContact === 'Email' && valueEmail && !errorContact) return false
        if (step === 'Contact' && typeContact === 'Phone' && valuePhone && !errorContact) return false
        return true
    }
    return (
        <div className={styles.ContactData}>
            <div className={styles.ContactData__header}>
                <span> Verify your contact information </span>
            </div>
            <span className={styles.error}>{errorCode}</span>
            <div className={styles.ContactData__main}>
                {
                    step === 'Contact' ?
                        <div className={styles.fieldContact}>
                            <ul onClick={() => setToggleMenu(!toggleMenu)} className={styles.menuPhone} >
                                <li> {typeContact} <img src={require(`@assets/images/icons/dropdown.svg`).default} /> </li>
                                {typeContact === 'Phone' && toggleMenu && <li onClick={() => setTypeContact('Email')}>Email</li>}
                                {typeContact === 'Email' && toggleMenu && <li onClick={() => setTypeContact('Phone')}>Phone</li>}
                            </ul>
                        
                            {typeContact === 'Email' ?
                                <Email
                                    label={'Your email address'}
                                    error={errorContact}
                                    value={valueEmail}
                                    required={'required'}
                                    validateEmail={(value) => validateEmail(value)}
                                />
                                :
                                <Phone
                                    number={valuePhone}
                                    setNumber={(number) => validatePhone(number)}
                                    country={country}
                                    countries={props.countries}
                                    setCountry={(country) => setCountry(country)}
                                    error={errorContact}
                                />}
                        </div>
                        :
                        <VerifyContact
                            contact={typeContact === 'Phone' ? valuePhone : valueEmail}
                            contactId={contactId}
                            type={typeContact}
                            handlePinChange={(pincode) => checkPinCode(pincode)}
                            getNewCode={() => getNewCode()}
                            setStep={() => backStep()}
                            error={errorVerify} />
                }
            </div>
            <MessageBox text={errorContact || errorVerify} />
            <div className={`${styles.ContactData__footer} ${step === 'Verify' && styles.footerCenter}`}>
                <Button type={'button'} onClick={() => backStep()} disabled={false} className={'text'}>
                    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.999999 7L0.292892 6.29289C0.105355 6.48043 -1.39974e-06 6.73478 -1.34048e-06 7C-1.28123e-06 7.26522 0.105356 7.51957 0.292892 7.70711L0.999999 7ZM7.70711 1.70711C8.09763 1.31658 8.09763 0.683418 7.70711 0.292893C7.31658 -0.0976319 6.68342 -0.0976317 6.29289 0.292893L7.70711 1.70711ZM6.2929 13.7071C6.68342 14.0976 7.31659 14.0976 7.70711 13.7071C8.09763 13.3166 8.09763 12.6834 7.70711 12.2929L6.2929 13.7071ZM1.70711 7.70711L7.70711 1.70711L6.29289 0.292893L0.292892 6.29289L1.70711 7.70711ZM7.70711 12.2929L1.70711 6.29289L0.292892 7.70711L6.2929 13.7071L7.70711 12.2929Z" fill="#3463F8" />
                    </svg> Back
                </Button>
                <Button type={'button'} onClick={() => nextStep()} loading={loading} disabled={disableNextButton()} className={'button'}>
                    {step === 'Contact' ? 'Continue' : 'Confirm'}
                </Button>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        getInstanceState: state.getInstanceState,
        countries: state.countries
    }),
    dispatch => ({
        action_getInstanceState: (obj) => {
            dispatch(action_getInstanceState(obj));
        },
    })
)(ContactData);