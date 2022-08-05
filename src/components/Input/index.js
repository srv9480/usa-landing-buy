// tools
import React, {Expansion} from "@tools/ReactExpansion";
import PulseLoader from "react-spinners/PulseLoader";

// styles
import styles from "./styles.scss";

class Input extends Expansion {
    constructor(props) {
        super(props);

        const inputType = props.type === 'date';

        this.state = {
            value: '',
            focus: inputType,
        };

        this.valueFillingProcess = null;
        this.input = React.createRef();
    }

    componentDidUpdate() {
        this.inputFillProps();
        this.labelFocus();
    }

    componentDidMount() {
        this.inputFillProps();
        this.labelFocus();
    }

    inputFillProps() {
        const value = this.props.value;
        if(this.valueFillingProcess !== value && value !== undefined) {
            this.valueFillingProcess = value;
            this.setState({value: value || ''});
        }
    }

    labelFocus() {
        if(this.props.type !== 'date') {
            if(this.state.focus !== !!this.state.value) {
                this.setState({focus: !!this.state.value});
            }
        }
    }

    onClick() {
        const onClick = this.props.onClick;
        if(typeof onClick === 'function') {
            onClick(...arguments);
        }
    }

    onChange(event) {
        const value = event.target.value;
        const onChange = this.props.onChange;
        let returnValue;
        if(typeof onChange === 'function') {
            returnValue = onChange(value);
            if(typeof returnValue !== 'string') {
                returnValue = null;
            }
        }
        this.setState({value: returnValue !== null ? returnValue : value});
    }

    onPaste(event) {
        const { value } = event.target;
        const { onPaste } = this.props;
        if(typeof onPaste === 'function') {
            onPaste(value);
        }
    }

    onFocus() {
        const { onFocus } = this.props;
        if(typeof onFocus === 'function') {
            onFocus(...arguments);
        }
    }

    onBlur() {
        const { onBlur } = this.props;
        if(typeof onBlur === 'function') {
            const value = onBlur(...arguments);
            if(value) {
                this.setState({value});
            }
        } else {
            null;
        }
    }

    refInput(ref) {
        const propsRef = this.props.importRef;
        if(typeof propsRef === 'function') {
            propsRef(ref);
        }
        this.input = ref;
    }

    render() {
        return (
            <div className={`${styles.wrapper} ${this.props.className || ''} ${this.props.error ? styles.error : ''}` }>
                <input
                    ref={this.refInput.bind(this)}
                    type={this.props.type || 'text'}
                    value={this.state.value}
                    autoComplete={'new-password'}
                    onClick={this.onClick.bind(this)}
                    onChange={this.onChange.bind(this)}
                    onPaste={this.onPaste.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    disabled={this.props.disabled}
                />
                {
                    this.props.label
                    && <label
                            className={this.state.focus ? `${styles.active} ${this.props.telInputStyles && this.props.telInputStyles.active}` : null}
                            onClick={() => { this.input.focus() }}>
                            {this.props.label}
                        </label>
                }
                {
                    this.props.loader && <PulseLoader color={'#3463F8'} css={{position: 'absolute', left: 40, top: 10}} size={7}/>
                }

                {
                    this.props.logo &&
                    <img
                        src={require(`@assets/images/icons/${this.props.logo}`).default}
                        style={{ position: "absolute", top: '14px', right: '15px', width: '30px' }}
                    />
                }
                {
                    this.props.error && <p> {this.props.error} </p>
                }
            </div>
        );
    }
}

export default Input;