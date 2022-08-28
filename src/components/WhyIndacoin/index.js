import React from 'react';
//import styles from './styles.scss';
import styles from './styles.scss';
import icon1 from '../../assets/images/free-icon-7years.webp';
import icon2 from '../../assets/images/free-icon-5m.webp';
import icon3 from '../../assets/images/free-icon-credit.webp';
import icon4 from '../../assets/images/free-icon-support.webp';
import icon5 from '../../assets/images/free-icon-telegram.webp';

const WhyIndacoin = () => {
      return (
            <div id="section3">
                  <div className={styles.whyIndacoin}>
                        <div className={styles.whyIndacoinElements}>
                              <h2>Why Indacoin</h2>
                              <div className={styles.whyText}>
                                    Operating since 2014, Indacoin was always focused on creating a smooth
                                    fiat-to-crypto transition that would be available for any bank card owner.<br /><br/>
                                    We continue to pursue this goal having a head start of
                              </div>
                        </div>
                        <div className={styles.iconItems}>
                              <div className={styles.item}>
                                    <img src={icon1} width="125px" height="110px" alt="" style={{margin: 20}}/>
                                    <div className={styles.itemText}>
                                          <b>7+ years</b><br />
                                          of experience
                                    </div>
                              </div>
                              <div className={styles.item}>
                                    <img src={icon2} width="147px" height="152px" alt="" />
                                    <div className={styles.itemText}>
                                          <b>5M+</b><br />
                                          verified clients
                                    </div>
                              </div>
                              <div className={styles.item}>
                                    <img src={icon3} width="129px" height="109px" alt="" style={{margin: 20}} />
                                    <div className={styles.itemText}>
                                          <b>Credit and debit</b><br />
                                          card support
                                    </div>
                              </div>
                              <div className={styles.item}>
                                    <img src={icon4} width="111px" height="112px" alt="" style={{margin: 20}} />
                                    <div className={styles.itemText}>
                                          <b>24/7</b><br />
                                          Live support
                                    </div>
                              </div>
                              <div className={styles.item}>
                                    <img src={icon5} width="120px" height="111px" alt="" style={{margin: 20}} />
                                    <div className={styles.itemText}>
                                          <b>Telegram</b><br />
                                          integration
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
};

export default WhyIndacoin;