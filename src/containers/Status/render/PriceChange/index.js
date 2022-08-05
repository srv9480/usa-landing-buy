import React, {Expansion} from "@tools/ReactExpansion";
import {connect} from "react-redux";

import styles from "../../styles.scss"
import Button from "@components/Button";
import requests from "@requests/request";
import action_getInstanceStateStatus from "@redux/actions/getInstanceStateStatus";


class PriceChange extends Expansion {
    constructor(props) {
        super(props);
        this.state = {
            renderCash: false,
            newValue: 0
        };
    }
    componentDidMount() {
        const {
            amountInCashin,
            amountIn,
            currencyIn,
            currencyOut,
            networkId
        } = this.props.getInstanceStateStatus
        if (amountIn && currencyIn && currencyOut && networkId) {
            requests.Calculator(currencyIn.id, currencyOut.id, amountIn, networkId).then((amountOut) => {
                if (amountInCashin > amountOut) {
                    const percentAmount = (amountInCashin / 100) * (amountInCashin - amountOut)
                    if (percentAmount > 0) {
                        this.setState({renderCash: true, newValue: amountOut})
                    } else {
                        this.confirmExchange(amountOut)
                    }
                } else {
                    this.confirmExchange(amountOut)
                }
            })
        }
    }

    confirmExchange (AmountOut) {
        const params = {amountOutDisplayed: AmountOut}
        requests.ConfirmExchange(this.props.getInstanceStateStatus.exchangeRequestId, this.props.getInstanceStateStatus.hash, params)
        this.props.action_getInstanceStateStatus({
            statusApruve: true
        })
        this.setState({renderCash: false})
        this.props.setGetInitialStatus(true)
    }

    cancelExchange () {
        // Сделать редирект в начало
        requests.CancelExchange(this.props.getInstanceStateStatus.exchangeRequestId, this.props.getInstanceStateStatus.hash)
    }

    render() {


        const dataCashin = this.props.getInstanceStateStatus
        let newValue = 0
        requests.Calculator(dataCashin.currencyIn.id, dataCashin.currencyOut.id, dataCashin.amountIn, dataCashin.networkId).then((responce) => {
            newValue = responce
        })
        if (this.state.renderCash) {
            return (
                <div className={styles.wrapperCheckAmount}>
                    <img src={require(`../../../../assets/images/icons/priceChange.png`).default}/>
                    <div className={styles.priceChangeText}>
                        <p>The amount of your order have changed from <b style={{color: "#3463F8"}}>{dataCashin.amountInCashin} {dataCashin.currencyOut.shortName}</b> to <b style={{color: "#3463F8"}}>{this.state.newValue} {dataCashin.currencyOut.shortName}</b> due to price change. <span style={{color: "#3463F8"}}>How?</span></p>
                    </div>
                    <div className={styles.buttonBlock}>
                        <Button
                            type={'button'}
                            className={'text'}
                            onClick={() => cancelExchange() }>
                                <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.999999 7L0.292892 6.29289C0.105355 6.48043 -1.39974e-06 6.73478 -1.34048e-06 7C-1.28123e-06 7.26522 0.105356 7.51957 0.292892 7.70711L0.999999 7ZM7.70711 1.70711C8.09763 1.31658 8.09763 0.683418 7.70711 0.292893C7.31658 -0.0976319 6.68342 -0.0976317 6.29289 0.292893L7.70711 1.70711ZM6.2929 13.7071C6.68342 14.0976 7.31659 14.0976 7.70711 13.7071C8.09763 13.3166 8.09763 12.6834 7.70711 12.2929L6.2929 13.7071ZM1.70711 7.70711L7.70711 1.70711L6.29289 0.292893L0.292892 6.29289L1.70711 7.70711ZM7.70711 12.2929L1.70711 6.29289L0.292892 7.70711L6.2929 13.7071L7.70711 12.2929Z" fill="#3463F8"/>
                                </svg> Back
                            </Button>
                        <Button 
                            type={'button'}
                            onClick={() => this.confirmExchange(this.state.newValue) }
                        > Accept and continue
                        </Button>
                    </div>
                </div>
            );
        } else {
            return null
        }
        
    }
}

export default connect(
    state => ({
        getInstanceStateStatus: state.getInstanceStateStatus
    }),
    dispatch => ({
        action_getInstanceStateStatus: (obj) => {
            dispatch(action_getInstanceStateStatus(obj));
        }
    })
)(PriceChange);
