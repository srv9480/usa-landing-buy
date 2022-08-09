import React from 'react';
import styles from "./styles.scss";

const ModalMy = ({ isVisible = false, title, content, footer, onClose }) => {
      const keydownHandler = ({ key }) => {
            switch (key) {
                  case 'Escape':
                        onClose();
                        break;
                  default:
            }
      };

      React.useEffect(() => {
            document.addEventListener('keydown', keydownHandler);
            return () => document.removeEventListener('keydown', keydownHandler);
      });

      return !isVisible ? null : (
            <div className={styles.modalMy} onClick={onClose}>
                  <div className={styles.modaldialogOpen} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalheader}>
                              <h3 className={styles.modaltitle}></h3>
                              <span className={styles.modalclose} onClick={onClose}>
                                    {/* <button className={styles.abl} type="button"><div className={styles.abm0}><svg aria-label="Закрыть" className={styles.ab6} style={{color: "#ffffff", fill: "#ffffff", height: "24", role: "img", viewBox: "0 0 24 24", width: "24"}}><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg></div></button> */}
                             
                              </span>
                        </div>
                        <div className={styles.modalbody}>
                              <div className={styles.modalcontent}>{content}</div>
                        </div>
                        {footer && <div className={styles.modalfooter}>{footer}</div>}
                  </div>
            </div>
      );
};

export default ModalMy;