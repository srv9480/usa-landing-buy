// tools
import React, {Expansion} from "@tools/ReactExpansion";

// styles
import styles from "./styles.scss";

class InputChecked extends Expansion {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={styles.wrapper}>
                <label>
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        onChange={(event) => this.props.onChange(event.target.checked)}
                    />
                        <span>
                            {this.props.label}
                        </span>
                </label>
            </div>
        );
    }
}

export default InputChecked;