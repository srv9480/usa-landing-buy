import React from 'react'
import styles from './styles.sass'

const Stepper = (props) => {
    const labelArray = ['Order', 'Wallet', 'Contact', 'Payment', 'Verification', 'Success']

    return (
        <div className={styles.Stepper}>
            {labelArray.map((item, index) => 
                <Step
                key={index + item}
                index={index}
                label={item}
                selected={props.step === index + 1}
                complete= {props.step > index + 1}
                />
            )}
        </div>
    )
}

function Step(props) {
    return (
        <div className={`${styles.stepWrapper} ${(props.selected || props.complete) && styles.selected}`}>
            <div className={`${styles.stepBlock} ${(props.selected || props.complete) && styles.selected}`}>
                <span>{props.label}</span>
                <div className={`${styles.circleWrapper}`}>
                    <div className={styles.circle}>{props.index + 1}</div>
                </div>
            </div>
            {
                props.index != 5 && <div className={styles.line}/>
            }
        </div>
    )    
}

export default Stepper;