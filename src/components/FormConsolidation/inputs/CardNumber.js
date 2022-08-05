// tools
import React, {Expansion} from "@tools/ReactExpansion";

// npm
import payment from "payment";

// components
import Input from "@components/Input";

// redux
import {connect} from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";

class CardNumber extends Expansion {
    constructor() {
        super();

        this.state = {
            valueSave: '',
            error_cardNumber: null,
            logo: null,
            cardNumberCountryBank: { number: null, alpha2: null, valid: null },
        };

        this.refCardNumber = null;
    }

    componentDidMount() {
        this.sortCard();
        this.formatCard();
    }

    componentDidUpdate() {
        this.props_valueSave();
    }

    props_valueSave() {
        const value = this.props.value;
        const valueSave = this.state.valueSave;
        if(value && valueSave === '') {
            this.setState({valueSave: value}, this.onBlur);
        }
    }

    sortCard() {
        payment.setCardArray(payment.getCardArray().filter((item) => {
            if(item.type === 'visa') {
                item.length = [16];
            }
            if(item.type === 'mastercard' || item.type === 'visa') {
                return item;
            }
        }));
    }

    formatCard() {
        if(this.refCardNumber !== null) {
            payment.formatCardNumber(this.refCardNumber);
        }
    }

    error_cardNumber(bool = false) {
        const { cardNumberCountryBank } = this.state;

        var text = bool === false && 'Incorrect card number' || null;

        this.setState({ error_cardNumber: cardNumberCountryBank.valid || text });
    }
    
    validate({ value: numberValue, boolCallback }) {
        if (typeof boolCallback === 'function') {
            boolCallback(Payment.fns.validateCardNumber(numberValue));
        }
    }

    action_getInstanceState(obj) {
        this.props.action_getInstanceState(obj);
    }

    get value() {
        const value = this.state.valueSave || this.props.getInstanceState.value_cardNumber || this.props.defaultValue;
        return value;
    }

    onChange(value = '') {
        // get type of card and set card logo
        if (value.replace(/\D/g, '').length >= 6 && this.state.logo === null) {
            var cardNumber = value.replace(' ', '').substring(0, 6);
            var cardType = payment.fns.cardType(cardNumber);
            var logo;
            switch(cardType) {
                case 'visa': logo = 'visa.png'; break;
                case 'mastercard': logo = 'mastercard.svg'; break;
            };
            this.setState({ logo });
        } else if (value.replace(/\D/g, '').length < 6) {
            this.setState({ logo: null });
        }

        this.setState({valueSave: value}, () => {
            const remainderOfDivision = value.length % this.state.valueSave.length;
            if(remainderOfDivision > 3 && remainderOfDivision !== this.state.valueSave.length -1) {
                this.validate({
                    value,
                    boolCallback: (bool) => {
                        this.error_cardNumber(bool);
                        this.action_getInstanceState({valid_cardNumber: bool});
                    }
                });
                
            } else {
                this.validate({
                    value,
                    boolCallback: (bool) => {
                        this.error_cardNumber(null);
                        this.action_getInstanceState({valid_cardNumber: bool});
                    }
                });
            }
            this.action_getInstanceState({value_cardNumber: value});
        });
        
    }

    onBlur(event) {
        const value = event && event.target && event.target.value || this.state.valueSave;
        this.validate({
            value,
            boolCallback: (bool) => {
                this.error_cardNumber(bool);
                this.action_getInstanceState({
                    valid_cardNumber: bool,
                    value_cardNumber: value,
                });
                this.setState({valueSave: value});
            }
        });
        
    }

    render() {
        return (
            <Input
                importRef={ref => this.refCardNumber = ref}
                label={'Card number'}
                logo={this.state.logo}
                error={this.state.error_cardNumber}
                value={this.value}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlur.bind(this)}
            />
        );
    }
}

export default connect(
    state => ({
        getInstanceState: state.getInstanceState
    }),
    dispatch => ({
        action_getInstanceState: (obj) => {
            dispatch(action_getInstanceState(obj));
        },
    })
)(CardNumber);