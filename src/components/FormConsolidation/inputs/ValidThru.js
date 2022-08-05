// tools
import React, {Expansion} from "@tools/ReactExpansion";

// npm
import payment from "payment";

// components
import Input from "@components/Input";

// redux
import {connect} from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";


class ValidThru extends Expansion {
    constructor() {
        super();

        this.state = {
            valueSave: '',
            error_validThru: null,
        };

        this.refCardExpiry = null;
    }

    componentDidMount() {
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

    formatCard() {
        if(this.refCardExpiry !== null) {
            payment.formatCardExpiry(this.refCardExpiry);
        }
    }

    error_validThru(bool = false) {
        const text = bool === false && 'Incorrect expiration date' || null;
        this.setState({error_validThru: text});
    }

    validate(value) {
        const decision = payment.fns.validateCardExpiry(value) && (payment.fns.cardExpiryVal(value).year - new Date().getFullYear()) <= 10;
        // const decision = payment.fns.validateCardExpiry(value);
        const bool = value === '' ? null : decision;
        return bool;
    }

    action_getInstanceState(obj) {
        this.props.action_getInstanceState(obj);
    }

    get value() {
        const value = this.state.valueSave || this.props.getInstanceState.value_validThru || this.props.defaultValue;
        return value;
    }

    onChange(value = '') {
        const remainderOfDivision = value.length % this.state.valueSave.length;
        if(remainderOfDivision > 1 && remainderOfDivision !== this.state.valueSave.length -1) {
            const bool = this.validate(value);
            this.error_validThru(bool);
            this.action_getInstanceState({valid_validThru: bool});
        } else {
            const bool = this.validate(value);
            this.error_validThru(null);
            this.action_getInstanceState({valid_validThru: bool});
        }
        this.setState({valueSave: value});
        this.action_getInstanceState({value_validThru: value});
    }

    onBlur(event) {
        const value = event && event.target && event.target.value || this.state.valueSave;
        const bool = this.validate(value);
        this.error_validThru(bool);
        this.action_getInstanceState({
            valid_validThru: bool,
            value_validThru: value,
        });
        this.setState({valueSave: value});
    }

    render() {
        return (
            <Input
                importRef={ref => this.refCardExpiry = ref}
                label={'MM/YY'}
                error={this.state.error_validThru}
                value={this.value}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlur.bind(this)}
            />
        );
    }
}

export default connect(
    state => ({
        getInstanceState: state.getInstanceState,
    }),
    dispatch => ({
        action_getInstanceState: (obj) => {
            dispatch(action_getInstanceState(obj));
        },
    })
)(ValidThru);