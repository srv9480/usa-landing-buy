// tools
import React, { useState, useEffect } from "react";
import styles from "./styles.sass";

// components
import MenuOverlay from "@components/MenuOverlay";
import { Input } from '@components/Button'
import ReactCodeInput from "react-code-input";

export const Phone = (props) => {

    function selected(alpha2) {
        const country = props.countries.find((country) => country.alpha2 === alpha2)
        if (country) props.setCountry(country)
    }

    return (
        <div className={styles.phone}>
            {console.log(props.country)}
            <MenuOverlay
                labelMenu={'Select country'}
                dropMenuStyle={styles.dropMenuStyle}
                items={props.countries.map((country) => ({ id: country.alpha2, name: country.alpha2, longName: country.name }))}
                selected={(alpha2) => selected(alpha2)}
            >
                <img width={24} height={24} src={require(`@assets/images/images-menu/${props.country?.alpha2.toLowerCase()}.png`).default} alt='Country' />
                <span>{props.country.dialCode}</span>
            </ MenuOverlay>
            <Input
                label='Your phone number'
                type='number'
                error={props.error}
                value={Number(props.number?.split(props.country.dialCode)[1])}
                required={'required'}
                onChange={(value) => props.setNumber(props.country.dialCode + value)}
                onPaste={(value) => props.setNumber(props.country.dialCode + value)}
                onBlur={(value) => props.setNumber(props.country.dialCode + value)}
            />
        </div>
    );
}

export const Wallet = (props) => {
    return (
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
    )
}

export const Email = (props) => {
    return (
        <Input
            label={'Your email address'}
            value={props.value}
            error={props.error}
            required={'required'}
            onChange={(value) => props.validateEmail(value)}
            onPaste={(value) => props.validateEmail(value)}
            onBlur={(value) => props.validateEmail(value)}
        />
    )
}

export const VerifyContact = (props) => {
    const [seconds, setSeconds] = useState(60)

    useEffect(() => { if (seconds > 0) { setTimeout(() => setSeconds(seconds - 1), 1000); } })

    return (
        <div className={styles.PhoneVerification}>
            <div className={styles.phoneBlock}>
                <p>{props.contact}</p>
                <img onClick={props.setStep} src={require(`@assets/images/icons/edit.svg`).default} style={{ cursor: "pointer" }} />
            </div>
            <div className={styles.infoBlock}>
                <p>We have sent the code to your contact.</p>
                <p>Please enter this code below.</p>
            </div>
            <div className={styles.pinBlock}>
                <ReactCodeInput
                    id="pinCode"
                    type="number"
                    isValid={!props.error}
                    fields={6}
                    onChange={props.handlePinChange}
                    value={props.pinCode}
                />
            </div>
            <div className={styles.taimerBlock}>
                {seconds > 0 ?
                    <p>Get new code in <span> 0:{seconds >= 10 ? '' : '0'}{seconds}</span></p>
                    :
                    <span className={styles.newCode} onClick={() => {
                        setSeconds(60),
                            props.getNewCode()
                    }}>Get new code</span>
                }
            </div>
        </div>
    );
}

export default Phone;