// tools
import React, {Expansion} from "@tools/ReactExpansion";

// components
import Input from "@components/Input";

// redux
import {connect} from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";

class FullNameCard extends Expansion {
    constructor() {
        super();

        this.state = {
            valueSave: undefined,
            error_fullName: null,
        }
        this.isDisabled = false;
    }

    componentDidUpdate() {
        this.props_valueSave();
    }

    props_valueSave() {
        const value = this.props.value;
        const valueSave = this.state.valueSave;

        // if skip step partner
        if (valueSave === undefined) {
            this.setState({valueSave: ''}, this.onBlur);
            this.isDisabled = false;
        }
        else if(value && valueSave === undefined) {
            this.setState({valueSave: value}, this.onBlur);
            this.isDisabled = true;
        }
    }

    error_fullNameCard(bool = false) {
        const text = bool === false && 'incorrectly entered name on the card' || null;
        this.setState({error_fullName: text});
    }

    validate(value) {
        const test = /^(?:[А-яA-zÀ-ž\x20]*){1,}$/g.test(value);
        const bool = value === '' ? null : test;
        return bool;
    }

    action_getInstanceState(obj) {
        this.props.action_getInstanceState(obj);
    }

    get value() {
        const value = this.state.valueSave === '' ? '' : this.state.valueSave || this.props.getInstanceState.value_fullNameCard || this.props.defaultValue;
        return value && value.toUpperCase();
    }

    onChange(value = '') {
        const bool = this.validate(value);
        this.error_fullNameCard(bool);
        this.action_getInstanceState({valid_fullNameCard: bool});
        this.setState({valueSave: value});
        this.action_getInstanceState({value_fullNameCard: value});
    }

    onBlur(event) {
        const value = event && event.target && event.target.value || this.state.valueSave;
        const bool = this.validate(value);
        this.error_fullNameCard(bool);
        this.action_getInstanceState({
            valid_fullNameCard: bool,
            value_fullNameCard: value,
        });
        this.setState({valueSave: value});
    }

    render() {
        return (
            <Input
                label={'Card holder name'}
                error={this.state.error_fullName}
                value={this.state.valueSave || this.props.getInstanceState.value_fullNameCard}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlur.bind(this)}
                disabled={this.isDisabled}
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
)(FullNameCard);