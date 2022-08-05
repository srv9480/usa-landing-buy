// tools
import React, {Expansion} from "@tools/ReactExpansion";

// styles
import styles from "./styles.scss";

class FullscreenLoader extends Expansion {
    constructor() {
        super();

        this.state = {
            logoUrl: null,
            type: '',
        };

        this.object = React.createRef();
        this.timeoutCheckData = null;
        this.intervalAnimated = null;
        this.img = null;
    }

    componentDidMount() {
        this.logoSetUrl();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutCheckData);
        clearInterval(this.intervalAnimated);
        this.img.onload = null;
        this.img.onerror = null;
    }

    logoAnimated() {
        const
            params = {
                type: 'oneByOne',
                duration: 200,
                start: 'autostart',
            },
            checkData = () => {
                const dataReq = this.props.dataReq;
                if(typeof dataReq === 'function') {
                    dataReq(dataReq());
                }
            },
            timeoutCheckData = () => {
                this.timeoutCheckData = setTimeout(checkData, 1600); // 4000
            },
            resetAnimated = () => {
                checkData();
                timeoutCheckData();
            },
            delayAnimated = 1600; // 6000;
        this.intervalAnimated = setInterval(resetAnimated, delayAnimated);
        timeoutCheckData();
    }

    logoSetUrl() {
        this.img = new Image();        
        this.setStateUpdate({
            logoUrl: require('@images/icons/preloader.gif').default,
            type: 'image/gif',
        }, this.logoAnimated);
    }

    render() {
        return (
            <main className={styles.wrapper}>
                <div>
                    <div>
                        {
                            this.state.logoUrl
                            && <>
                                <object ref={ref => this.object = ref} type={this.state.type} data={this.state.logoUrl}/>
                            </>
                        }
                    </div>
                </div>
            </main>
        );
    }
}

export default FullscreenLoader;