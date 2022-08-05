// tools
import React, {Expansion} from "@tools/ReactExpansion";

// styles
import styles from "@containers/Status/styles.scss";

// redux
import {connect} from "react-redux";


class Waiting extends Expansion {
    constructor() {
        super();
    }
    getListCurImg(cur) {
        try {
            const img = require(`@assets/images/icons/${cur}.svg`)
            return img.default
        } catch (err) {
            return null
        }
    }

    render() {
        const dataCashin = this.props.getInstanceStateStatus
        return (
            <div>
                <div className={styles.wrapperStatusCashin}>
                    <div className={styles.headerStatus}>
                        <h2>Order № <span>{dataCashin.exchangeRequestId}</span> {dataCashin.statusCashin} <img width={25} height={24} src={this.getListCurImg(dataCashin.statusCashin)}/></h2>
                        {
                            dataCashin.statusCashin === 'InProgress' &&
                            <span>Your payment is being proceed, do not close this page and wait up to 15 minutes until we change the transaction status.</span>
                        }
                    </div>
                    <div className={styles.mainStatus}>
                        <p>Paid <span>{dataCashin.amountIn} {dataCashin.currencyIn.shortName}</span></p>
                        <p>Total <span>{dataCashin.amountInCashin} {dataCashin.currencyOut.shortName}</span></p>
                        <p>Date <span>{dataCashin.createdAt}</span></p>
                        <p>Address <span>{dataCashin.cryptoAddress}</span></p>
                    </div>
                    <div className={styles.footerStatus}>
                        <div className={styles.tgLinkContainer}>
                            <a
                                href={'http://bit.ly/3bY43ZR'}
                                target={'_blank'}
                            >
                                Check the order status in Telegram
                                &nbsp;
                                <img src={require('@images/icons/telegram_logo.svg').default} alt={'telegram_logo'} width="19" height="20" />
                            </a>
                            <a
                            href={'#'}>
                                Need help?
                            </a>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

export default connect(
    state => ({
        getInstanceStateStatus: state.getInstanceStateStatus
    }),
    null
)(Waiting);
