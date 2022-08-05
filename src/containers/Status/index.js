// tools
import React, {Expansion} from "@tools/ReactExpansion";

// styles
import styles from "./styles.scss";

// render
import Kyc from "@containers/Status/render/Kyc/index.jsx";
import CheckAmount from "@containers/Status/render/PriceChange";
import StatusCashin from "@containers/Status/render/StatusCashin";

// redux
import {connect} from "react-redux";

const KYC = 'KYC'
const CHECKAMOUNT = 'CHECKAMOUNT'
const STATUSCASHIN = 'STATUSCASHIN'

class Status extends Expansion {
    constructor() {
        super();

        this.state = {
            status: null,
            statusCash: false,
            kycStatus: false
        };
    }    

    componentDidMount() {
        this.setGetInitialStatus();
    }

    componentDidUpdate() {
        this.setGetInitialStatus();
    }

    setGetInitialStatus () {
        const dataStatus = this.props.getInstanceStateStatus

        if(!this.state.kycStatus && !dataStatus.statusKYC || this.state.kycStatus === 'RED') {
            this.setStateUpdate({status: KYC});
            return null;
        }

        if(!dataStatus.statusApruve || !this.state.statusCash) {
           
            this.setStateUpdate({status: CHECKAMOUNT},  this.props.step(5));
            return null;
        }

        if (dataStatus.statusCashin === 'InProgress' || dataStatus.statusCashin === 'Declined' || dataStatus.statusCashin === 'Completed' ) {
            
            this.setStateUpdate({status: STATUSCASHIN}, this.props.step(6));
            return null;
        }
    }

    setStatusCash (status) {
        this.setState({statusCash: status})
    }

    router() {
        switch(this.state.status) {
            case null       : return (
                <span>Please, wait...</span>
            );
            case KYC                : return <Kyc status={(status) => this.setState({kycStatus: status})}/>;
            case CHECKAMOUNT        : return <CheckAmount setGetInitialStatus={(status) => this.setStatusCash(status)}/>;
            case STATUSCASHIN       : return <StatusCashin />;     
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {this.router()}
                    <button onClick={() => this.setStateUpdate({kycStatus: true})}>success KYC</button>
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
)(Status);