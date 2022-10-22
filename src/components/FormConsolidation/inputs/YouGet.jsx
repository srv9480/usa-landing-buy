import React from 'react';

// styles
import styles from "./../styles.sass";

// components
import MenuOverlay from "@components/MenuOverlay";
import { Input }         from '@components/Button'

function YouGet (props) {
    const loader = true
    return (
        <div className={styles.paymentInput} style={{marginTop: '10px'}}>
      
            <Input
                value={props.amount}
                disabled={true}
                loader={loader}
            />
            <MenuOverlay
                labelMenu={'Select cryptocurrency'}
                items={props.items}
                disabled={props.disabled}
                selected={(selected) => props.selectedGive(selected)}                
                value={props.currency}
            />
        </div>
    );
}

export default YouGet;
