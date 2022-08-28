import React from 'react';
import styles from "./styles.scss";
import closeimg from "@assets/images/closeModal.webp";

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
                            
                              <img
                              src={closeimg}
                              style={{ width: '25px' }}
                              />
                            
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