import React, {Component} from 'react';
import Modal from 'react-modal';
import styles from './styles.scss';

Modal.setAppElement(`#root`);

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, .75)';
Modal.defaultStyles.overlay.zIndex = 2147483640;

const MODAL_LG = 'lg';
const MODAL_MD = "md";

export default class extends Component {
    constructor (props) {
        super(props);

        this.className = styles.modal;

        if (typeof this.props.type !== 'undefined') {
            if (this.props.type === MODAL_LG) {
                this.className += ` ${styles.lg}`;
            }

            if (this.props.type === MODAL_MD) {
                this.className += ` ${styles.md}`;
            }
        }

        this.showHeader = !(typeof this.props.header !== 'undefined' && this.props.header === false);
    }

    render() {
        return (
            <Modal
                isOpen={ this.props.isOpen }
                onRequestClose={ this.props.onRequestClose || null }
                className={ this.className }
                styles={ this.props.styles || {} }
            >
                <div className={ styles.container }>

                    {
                        this.showHeader ?
                            <div className={styles.header}>
                                <span className={styles.title}>
                                    {this.props.title || ''}
                                </span>
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    if (typeof this.props.closeModal !== `undefined`) {
                                        this.props.closeModal();
                                    }
                                }}>
                                    <span>SEND</span>
                                </button>
                            </div>
                            :
                            null
                    }

                    <div
                        style={this.showHeader ? {} : {paddingTop: 0}}
                        className={styles.content}
                    >
                        {this.props.children}
                    </div>

                </div>
            </Modal>
        );
    }
}