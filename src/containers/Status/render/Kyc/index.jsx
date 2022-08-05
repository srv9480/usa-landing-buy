// tools
import React, {Expansion} from "@tools/ReactExpansion"
// styles
import styles from "@containers/Status/styles.scss"
// components
import SumsubWebSdk from '@sumsub/websdk-react'
// redux
import {connect} from "react-redux";
//request
import exchangeRequest from "@requests/request.jsx"

class Kyc extends Expansion {
    constructor() {
        super();

        this.state = {
            kycToken: null,
        };
    }
    componentDidMount() {
        this.kyc();
    }

    kyc() {
        exchangeRequest.AccessToken(this.props.getInstanceStateStatus.exchangeRequestId).then(response => {
            this.setStateUpdate({
                kycToken: response.accessToken,
            });
        })
    }
    
    onMessage (type, payload = {}) {
        const { reviewResult } = payload;
        if (reviewResult && reviewResult.reviewAnswer === 'GREEN'
            || reviewResult && reviewResult.reviewAnswer === 'RED') {
            this.props.status(reviewResult.reviewAnswer)
        }
    }

    render() {
        return (
            <div className={styles.kyc}>
                {
                    this.state.kycToken &&
                    <SumsubWebSdk
                        accessToken={this.state.kycToken}
                        expirationHandler={() => console.log('token expired')}
                        onMessage={(type, payload) => {
                            this.onMessage(type, payload)
                        }}
                        onError={(e) => console.log('error', e)}
                    />
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        getInstanceStateStatus: state.getInstanceStateStatus
    }),
    null
)(Kyc);
