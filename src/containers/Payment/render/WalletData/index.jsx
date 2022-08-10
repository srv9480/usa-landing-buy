// tools
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.scss";
import { connect } from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";

// components
import Button from "@components/Button";

// import {Phone, Email, VerifyContact, Wallet} from '@components/Contact'
import MessageBox from '@components/MessageBox'

// request
import ContactRequest from '@requests/payment/ContactRequest';


const [addressWallet, setAddressWallet] = useState(null)
const [errorWallet, setErrorWallet] = useState(false)
const [disabledWallet, setDisabledWallet] = useState(false)



const WalletData = (props) => {
      const [searchParams] = useSearchParams();
      const query = [...searchParams.entries()]
            .reduce((acc, val) => {
                  const [key, value] = val
                  return { ...acc, [key]: value }
            }, {})
      const [errorCode, setErrorCode] = useState(null)
      const [step, setStep] = useState('Wallet')
      // const [toggleMenu, setToggleMenu] = useState(false)
      // const [typeContact, setTypeContact] = useState('Email')




      const [loading, setLoading] = useState(false)


      //     useEffect(()=> {
      //         if (query.email) {
      //             setTypeContact('Email')
      //             validateEmail(query.email)
      //         }        
      //     }, [])

      // переключение типа контакта



      //     function validateEmail (value) {
      //         console.log(value)
      //         setValueEmail(value)
      //         if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( value )) {
      //             setErrorContact(null)
      //         } else setErrorContact('Incorrect email address')
      //     }


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




      // function nextStep() {
      //       if (step === 'Wallet') {
      //             setLoading(true)
      //             let contact
      //             if (typeContact === 'Phone') contact = valuePhone
      //             else contact = valueEmail
      //             ContactRequest.AddContacts(
      //                   props.getInstanceState.value_tradeUserId, typeContact, contact).then(response => {
      //                         setStep('Contact')
      //                         setContactId(response.id)
      //                         setLoading(false)
      //                         setErrorVerify(null)
      //                   }).catch(error => {
      //                         if (error.response.status === 400) setErrorContact(error.response.data)
      //                         else if (error.response.status === 500) setErrorContact('One or more fields are filled out incorrectly')
      //                         else if (error.response.status === 429) setErrorContact('Too many requests. Please wait a minute and try again')
      //                         else setErrorContact('internal Server Error')
      //                         setLoading(false)
      //                   })
      //       } else props.setStep(3)
      // }

      // function backStep() {
      //       if (step === 'Contact') {
      //             console.log(this)
      //             setStep('Wallet')
      //       } else {
      //             props.setStep(1)
      //       }
      // }
      // function disableNextButton(bool) {
      //       if (loading) return true

      // }
      return (
            <div className={styles.ContactData}>
                  <div className={styles.ContactData__header}>
                        <span> Verify your contact information </span>
                  </div>
                  <span className={styles.error}>{errorCode}</span>
                  <div className={styles.ContactData__main}>
                        {
                              step === 'Wallet' ?
                                    <div className={styles.fieldContact}>
                                         
                                          <Input
                                                label={'Recipient’s address'}
                                                error={errorWallet}
                                                value={addressWallet}
                                                disabled={disabledWallet}
                                                required={'required'}
                                                onChange={(value) => validateWallet(value)}
                                                onPaste={(value) => validateWallet(value)}
                                                onBlur={(value) => validateWallet(value)}
                                          />
                                    </div>
                                    :
                                    <Input
                                                label={'Recipient’s address'}
                                                error={errorWallet}
                                                value={addressWallet}
                                                disabled={disabledWallet}
                                                required={'required'}
                                                onChange={(value) => validateWallet(value)}
                                                onPaste={(value) => validateWallet(value)}
                                                onBlur={(value) => validateWallet(value)}
                                          />
                        }
                  </div>
                 
                  <div className={`${styles.ContactData__footer} ${step === 'Verify' && styles.footerCenter}`}>
                        <Button type={'button'} onClick={() => backStep()} disabled={false} className={'text'}>
                              <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.999999 7L0.292892 6.29289C0.105355 6.48043 -1.39974e-06 6.73478 -1.34048e-06 7C-1.28123e-06 7.26522 0.105356 7.51957 0.292892 7.70711L0.999999 7ZM7.70711 1.70711C8.09763 1.31658 8.09763 0.683418 7.70711 0.292893C7.31658 -0.0976319 6.68342 -0.0976317 6.29289 0.292893L7.70711 1.70711ZM6.2929 13.7071C6.68342 14.0976 7.31659 14.0976 7.70711 13.7071C8.09763 13.3166 8.09763 12.6834 7.70711 12.2929L6.2929 13.7071ZM1.70711 7.70711L7.70711 1.70711L6.29289 0.292893L0.292892 6.29289L1.70711 7.70711ZM7.70711 12.2929L1.70711 6.29289L0.292892 7.70711L6.2929 13.7071L7.70711 12.2929Z" fill="#3463F8" />
                              </svg> Back
                        </Button>
                        <Button type={'button'} onClick={() => nextStep()} loading={loading} disabled={disableNextButton()} className={'button'}>
                              {step === 'Wallet' ? 'Continue' : 'Confirm'}
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
)(WalletData);
