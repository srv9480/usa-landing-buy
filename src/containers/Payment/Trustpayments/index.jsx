// tools
import React, {Expansion} from "@tools/ReactExpansion";


/**
 * TEST CARD: 5599 0050 8907 2784
 */
const Trustpayments = class extends Expansion {
    constructor() {
        super();

        this.state = {
            headerPayloadSignature: null,
            cash_in_payment_id: null,
            animation: false,
        };
        this.form = React.createRef();
    }
    
    componentDidMount() {
        const { token } = this.props,
        { headerPayloadSignature } = this.state;

        if (token && !headerPayloadSignature) {
            this.setState({
                headerPayloadSignature: token,
            }, this.createScript);
        }
    }

    componentDidUpdate() {
        const { token, cash_in_payment_id } = this.props,
        { headerPayloadSignature } = this.state;
        if (token && token !== headerPayloadSignature) {
            this.setState({
                headerPayloadSignature: token,
                cash_in_payment_id,
            }, this.createScript);
        }
    }

    createScript() {
        const { headerPayloadSignature } = this.state;
        (() => {
            /**
             * https://webservices.securetrading.net (European Gateway)
             * https://webservices.securetrading.us (US Gateway)
             */            
            let script = document.createElement('script');
            script.async = false;
            script.type = 'text/javascript';
            script.src = `https://webservices.securetrading.net/js/v3/st.js`;
            document.body.appendChild(script);
        })();
        /**
         * livestatus: 0 - dev || livestatus: 1 - prod
         * status=
         * errorcode=60107
         * orderreference=138
         * errordata=TRX+failed+fraud+screening
         * errormessage=Invalid+process
         */
        (() => {
            const string = `
            (function SecureTradingStart() {
                if (typeof SecureTrading === 'undefined') { setTimeout(SecureTradingStart, 1000); return null; }
                var st = SecureTrading({
                    jwt: '${headerPayloadSignature}',
                    livestatus: 0,
                    submitFields: ['orderreference', 'errorcode'],
                    submitOnError: true,
                });
                st.Components({ startOnLoad: true });
            })();
            `;
            let script = document.createElement('script');
            script.async = false;
            script.type = 'text/javascript';
            script.text = string;
            document.body.appendChild(script);
        })();
        if (this.state.animation === false) {
            this.setState({ animation: true });            
            var secureTradingInterval = null;
            secureTradingInterval = setInterval(() => {
                if (
                    window.secureTrading
                    || this.form.current.querySelector('input') !== null
                ) {
                    clearInterval(secureTradingInterval);
                    this.setState({ animation: false });
                }
            }, 1000);
        }
    }

    render() {
        if ( this.form.current && window.secureTrading ) {
            if (this.form.current) {
                const inputArr = this.form.current.querySelectorAll('input');
                const form = this.form.current.querySelector('form');
                const iframe = this.form.current.querySelector('iframe#st-control-frame-iframe');
                inputArr && inputArr.forEach(item => item.remove());
                form && form.remove();
                iframe && iframe.remove();
            }
        }        
        return <>
            { this.state.animation &&
                <div 
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: 400,
                        background: `url(${require('@images/icons/preloader.gif').default}) center center no-repeat`,
                        zIndex: 1,
                    }}
                />
            }            
            <div style={{ overflow: 'hidden', width: 0, height: 0 }}>
                <div id={'st-notification-frame'}/>
                <form ref={this.form} id={'st-form'} action={`/status/${this.props.exchangeRequestId}/${this.props.exchangeRequestHash}/${this.props.cash_in_payment_id}`}></form>
            </div>
        </>;
    }
};

export default Trustpayments;