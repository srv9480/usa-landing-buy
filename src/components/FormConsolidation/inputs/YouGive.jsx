import React from 'react';
import styles from "./../styles.sass"

// components
import MenuOverlay from "@components/MenuOverlay";
import { Input }         from '@components/Button'

const YouGive = (props) => {
    return (
        <div className={styles.paymentInput} style={{marginTop: '0px'}}>
            <Input
                label={'You pay'}
                type='number'
                error={props.error}
                value={props.amount}
                required = {'required'}
                onChange={(value) => props.setAmountGive(value)}
                onPaste={(value) => props.setAmountGive(value)}
                onBlur={(value) => props.setAmountGive(value)}
            />
            <MenuOverlay
                labelMenu={'Select fiat currency'}
                items={props.items}
                selected={(selected) => props.selectedGive(selected)}
                value={props.currency}
                disabled={props.disabled}
            />
            { props.error && <span className={styles.info} style={{color: '#ff0000'}}> {props.error} </span> }
            { !props.error && <span className={styles.info} style={{color: 'rgba(0, 0, 0, 0.6)'}}> {props.priceOneCrypto} </span> }
        </div>
    );
}

export default YouGive;
