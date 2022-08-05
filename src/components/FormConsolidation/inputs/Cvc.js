// tools
import React, {Expansion} from "@tools/ReactExpansion";

// npm
import payment from "payment";

// components
import Input from "@components/Input";

// redux
import {connect} from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";

class Cvc extends Expansion {
    constructor() {
        super();

        this.state = {
            valueSave: '',
            error_cvc: null,
        };

        this.refCardCVC = null;
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
        if(this.refCardCVC !== null) {
            payment.formatCardCVC(this.refCardCVC);
        }
    }

    error_cvc(bool = false) {
        const text = bool === false && 'Incorrect cvc number' || null;
        this.setState({error_cvc: text});
    }

    validate(value) {
        const decision = payment.fns.validateCardCVC(value);
        const bool = value === '' ? null : decision;
        return bool;
    }

    action_getInstanceState(obj) {
        this.props.action_getInstanceState(obj);
    }

    get value() {
        const value = this.state.valueSave || this.props.getInstanceState.value_cvc || this.props.defaultValue;
        return value;
    }

    onChange(value = '') {
        const remainderOfDivision = value.length % this.state.valueSave.length;
        if(remainderOfDivision > 3 && remainderOfDivision !== this.state.valueSave.length -1) {
            const bool = this.validate(value);
            this.error_cvc(bool);
            this.action_getInstanceState({valid_cvc: bool});
        } else {
            const bool = this.validate(value);
            this.error_cvc(null);
            this.action_getInstanceState({valid_cvc: bool});
        }
        this.setState({valueSave: value});
        this.action_getInstanceState({value_cvc: value});
    }

    onBlur(event) {
        const value = event && event.target && event.target.value || this.state.valueSave;
        const bool = this.validate(value);
        this.error_cvc(bool);
        this.action_getInstanceState({
            valid_cvc: bool,
            value_cvc: value,
        });
        this.setState({valueSave: value});
    }

    render() {
        return (
            <Input
                importRef={ref => this.refCardCVC = ref}
                label={'CVC'}
                error={this.state.error_cvc}
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
)(Cvc);