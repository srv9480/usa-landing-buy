// tools
import React, {Expansion} from "@tools/ReactExpansion";

// redux
import {connect} from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";

import action_getInstanceStateStatus from "@redux/actions/getInstanceStateStatus";
import action_currencyes from "@redux/actions/currencyes";
import action_countries from "@redux/actions/countries";

class ReduxContainer extends Expansion {
    componentDidMount() {
        if(this.props.getInstanceState === null) {
            this.props.action_getInstanceState();
        }

        if(this.props.getInstanceStateStatus === null) {
            this.props.action_getInstanceStateStatus();
        }

        if(this.props.currencyes === null) {
            this.props.action_currencyes();
        }

        if(this.props.countries === null) {
            this.props.action_countries();
        }
    }

    render() {
        return this.props.children;
    }
}

export default connect(
    state => ({
        getInstanceState: state.getInstanceState,
        currencyes: state.currencyes,
        countries: state.countries,
        getInstanceStateStatus: state.getInstanceStateStatus
    }),
    dispatch => ({
        action_getInstanceState: () => {
            dispatch(action_getInstanceState());
        },
        action_currencyes: () => {
            dispatch(action_currencyes());
        },
        action_countries: () => {
            dispatch(action_countries());
        },
        action_getInstanceStateStatus: () => {
            dispatch(action_getInstanceStateStatus())
        }
    })
)(ReduxContainer);