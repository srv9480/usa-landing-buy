import React from "react";
import styles from "./styles.scss";
import FaqItem from "./FaqItem";
import general from "./data/general";
import en from "../../locales/en.json"

const FaqSection = () => {

  return (
    <div className={styles.tokenallocation} id="faq">
      <div className={styles.headerFAQ}>
        <div>
          <p>FAQ</p>
        </div>
        <div></div>
      </div>
      <div className={styles.sectionFAQ}>
        <div className={styles.headerSection}>
          <p>GENERAL QUESTIONS</p>
        </div>
        <div className={styles.rightBlock}>
          
          {en.faq.general.questions.map((item) => {
        return (
          <FaqItem
            title={item.header}
            text={item.text}
            items={general}
            locales={en}
          />
        );
      })}
        </div>
        
      </div>
      <div className={styles.sectionFAQ}>
        <div className={styles.headerSection}>
          <p>PURCHASE</p>
        </div>
        <div className={styles.rightBlock}>
          
          {en.faq.purchase.questions.map((item) => {
        return (
          <FaqItem
            title={item.header}
            text={item.text}
            items={general}
            locales={en}
          />
        );
      })}
        </div>
        
      </div>
      <div className={styles.sectionFAQ}>
        <div className={styles.headerSection}>
          <p>COMMISSIONS</p>
        </div>
        <div className={styles.rightBlock}>
          
          {en.faq.commissions.questions.map((item) => {
        return (
          <FaqItem
            title={item.header}
            text={item.text}
            items={general}
            locales={en}
          />
        );
      })}
        </div>
        
      </div>
    </div>
  );
};

export default FaqSection;
