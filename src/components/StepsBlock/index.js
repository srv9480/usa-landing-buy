import React from "react";
import styles from "./styles.scss";
import numberOne from "../../assets/images/numberOneShadow.svg";
import numberThree from "../../assets/images/numberThree.svg";
import numberTwo from "../../assets/images/numberTwo.svg";
import numberFour from "../../assets/images/numberFour.svg";

const StepsBlock = () => {
  return (
    <div id="section4">
      <div className={styles.headerStep}>
        <div className={styles.mainHeader}>
          <p>How to buy cryptocurrency?</p>
        </div>
        <div className={styles.subTitle}>
          <p>
            With Indacoin, you can buy bitcoin, ethereum, ripple and other coins
            in{" "}
            <span style={{ color: "rgba(52, 99, 248, 1)" }}>
              4 simple steps
            </span>
            :
          </p>
        </div>
      </div>
      <div className={styles.numberBlocks}>
        
        
        <div className={styles.pcSection}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className={styles.numberBlock}>
            <div className={styles.numberStep}>
              <div className={styles.numberStepOne}>
                <img src={numberOne} />
              </div>
              <div>
                <p className={styles.numberTitle}>
                  Pick the currency you want to buy
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", alignItems: "end" }}>
              <div className={styles.boxBlock}></div>
            </div>
            <div className={styles.numberStep}>
              <div className={styles.numberStepThree}>
                <img src={numberThree} />
              </div>
              <div>
                <p className={styles.numberTitle}>Pay for your order</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "end",
                marginLeft: "-40px",
              }}
            >
              <div className={styles.boxBlockSecond}></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginLeft: "350px", marginTop: 30 }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginTop: -30 }}>
              <div className={styles.boxBlockThree}></div>
            </div>
            <div className={styles.numberStep}>
              <div className={styles.numberStepTwo}>
                <img src={numberTwo} />
              </div>
              <div>
                <p className={styles.numberTitle}>Enter your contact details</p>
              </div>
            </div>
          </div>
          <div className={styles.blockFour}>
            <div className={styles.numberStep}>
              <div className={styles.numberStepFour}>
                <img src={numberFour} />
              </div>
            </div>
          </div>
        </div>
          <div className={styles.textFour}>
          <div>
            <p>
              Actually there is no fourth step, just wait for the order to be
              completed :)
            </p>
          </div>
        </div>
        </div>
        <div className={styles.mobileSection}>
          <div
            style={{ display: "flex", marginBottom: 100 }}
            className={styles.numberBlock}
          >
            <div className={styles.numberStep}>
              <div className={styles.numberStepOne}>
                <img src={numberOne} />
              </div>
              <div>
                <p className={styles.numberTitle}>
                  Pick the currency you want to buy
                </p>
              </div>
            </div>
          </div>
          <div className={styles.secondSection} style={{ display: "flex", marginBottom: 100 }}>
            <div className={styles.numberStep}>
              <div className={styles.numberStepTwo}>
                <img src={numberTwo} />
              </div>
              <div>
                <p className={styles.numberTitle}>Enter your contact details</p>
              </div>
            </div>
          </div>
          <div className={styles.thirdSection} style={{ display: "flex", marginBottom: 100 }}>
            <div className={styles.numberStep}>
              <div className={styles.numberStepThree}>
                <img src={numberThree} />
              </div>
              <div>
                <p className={styles.numberTitle}>Pay for your order</p>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.numberStep}>
              <div className={styles.numberStepFour}>
                <img src={numberFour} />
              </div>
              <div className={styles.fourBlock}>
                <p className={styles.fourTextMobile}>
                  <p>
                    Actually there is no fourth step, just wait for the order to
                    be completed :)
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsBlock;
