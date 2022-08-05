import React from "react";
import styles from  "./styles.scss";






// styles


//import FullscreenLoader from "@containers/FullscreenLoader";
//import {PaymentContainer} from "@containers/Payment/index.jsx";
//import Paymentpage from "../Payment"
const MainBlock = () => {  
    return (
        <div>
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
                    <div className={styles.buyForm}>
                        
                    </div>

                </div>
            </div>
        </div>
    )
};

export default MainBlock;