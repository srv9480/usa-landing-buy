import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import styles from "./styles.scss";
// redux
import { connect } from "react-redux";
import action_getInstanceState from "@redux/actions/getInstanceState";

// components
import YouGive from "@components/FormConsolidation/inputs/YouGive";
import YouGet from "@components/FormConsolidation/inputs/YouGet";
import Button from "@components/Button";
import { Input } from '@components/Button';
import MessageBox from '@components/MessageBox';
import ModalMy from '@components/ModalMy';

// request
import requests from "@requests/request";

// img
import mastercard from '@assets/images/icons/mastercard.svg'
import pci from '@assets/images/icons/pci.svg'
import visa from '@assets/images/icons/visa.png'

const OrderDataTest = (props) => {

    // Query параметры из URL
    const [searchParams] = useSearchParams();
    const query = [...searchParams.entries()]
        .reduce((acc, val) => {
            const [key, value] = val
            return { ...acc, [key]: value }
        }, {})

    // YouGive
    const [selectedYouGive, setSelectedYouGive] = useState('USD');
    const [amountGive, setAmountGive] = useState(null);
    const [disabledGive, setDisabledGive] = useState(false)
    const debouncedValue = useDebounce(amountGive, 500)
    const [errorGive, setErrorGive] = useState(null);
    const [priceOneCrypto, setPriceOneCrypto] = useState(null)

    // YouGet
    const [selectedYouGet, setSelectedYouGet] = useState('BTC');
    const [amountGet, setAmountGet] = useState(null);
    const [disabledGet, setDisabledGet] = useState(false)
    const [loadingGet, setloadingGet] = useState(false)

    // DestinationAddress
    

    // Networks
    const [networks, setNetworks] = useState([])
    const [activeNetwork, setActiveNetwork] = useState(null);

    // Общие
    const [partner, setPartner] = useState(null)
    const [disableButton, setDisableButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    // Подгрузка списка сетей при смене криптовалюты и установка активной сети    
    useEffect(() => {
        setNetworks(props.currencyes.crypto.find((curr) => curr.shortName === selectedYouGet).networks)
        
        if (debouncedValue) Converter()
    }, [selectedYouGet])

    useEffect(() => setActiveNetwork(networks[0]?.shortName), [networks])

    // Запуск конвертера при изменении валют и суммы
    useEffect(() => {
        if (debouncedValue) Converter()
    }, [selectedYouGive, debouncedValue])



    // Инициализация компонента, проверка на наличие в query и redux
    // partner= amount= cur_from= cur_to= address= email=
    useEffect(() => {
        const {
            selected_youGive,
            selected_youGet,
            value_network,
            value_youGive,
            value_youGet,
        } = props.getInstanceState
        if (selected_youGive && selected_youGet && value_network && value_youGive && value_youGet) {
            return getInstanceParams()
        } else if (query && query.cur_from && query.cur_to && query.amount && query.address && query.email) return getQueryParams()
    }, [])

    // Включаем/Выключаем кнопку в зависимости от заполнения данных
    useEffect(() => {
        if (typeof amountGet === 'number' && !errorGive) return setDisableButton(false)
        setDisableButton(true)
    }, [amountGet])

    useEffect(() => {
        if (amountGet && (amountGive / amountGet) != Infinity) {
            return setPriceOneCrypto(`1 ${selectedYouGet} ~ ${(amountGive / amountGet).toFixed(6)} ${selectedYouGive}`)
        }
        else setPriceOneCrypto(null)
    }, [amountGet, selectedYouGet, selectedYouGive])

    function getQueryParams() {
        if (query.partner) setPartner(query.partner)
        // забираем параметры
        setSelectedYouGive(query.cur_from.toUpperCase())
        setSelectedYouGet(query.cur_to.toUpperCase())
        setAmountGive(query.amount)
        
        // отключаем поля
        setDisabledGive(true)
        setDisabledGet(true)
        
    }
    function getInstanceParams() {
        const {
            selected_youGive,
            selected_youGet,
            value_network,
            value_youGive,
            value_youGet,
           
            value_partnerName
        } = props.getInstanceState
        setSelectedYouGive(selected_youGive)
        setSelectedYouGet(selected_youGet)
        setAmountGive(value_youGive)
       
        setActiveNetwork(value_network)
        setAmountGet(value_youGet)
        setPartner(value_partnerName)
        // отключаем поля
        setDisabledGive(true)
        setDisabledGet(true)
        
    }

    function Converter() {
        setloadingGet(true)
        setAmountGet(' ')
        setErrorGive(null)
        const youGive = props.currencyes.fiat.find((curr) => curr.shortName === selectedYouGive)
        const youGet = props.currencyes.crypto.find((curr) => curr.shortName === selectedYouGet)
        const network = youGet.networks.find((network) => network.shortName.toUpperCase() === activeNetwork.toUpperCase()) || youGet.networks[0]
        requests.Calculator(youGive.id, youGet.id, debouncedValue, network.id).then((data) => {
            setAmountGet(data)
            props.setValueGet(data)
        }).catch(error => {
            if (error.response.status === 400) setErrorGive(error.response.data)
            else setErrorGive('internal Server Error')
        })
        setloadingGet(false)
    }

    function createRequest() {
        const {
            value_exchangeRequestId,
            value_exchangeRequestHash,
            verify_contact
        } = props.getInstanceState
        const youGive = props.currencyes.fiat.find((curr) => curr.shortName === selectedYouGive)
        const youGet = props.currencyes.crypto.find((curr) => curr.shortName === selectedYouGet)
        const network = youGet.networks.find((network) => network.shortName === activeNetwork)
        if (!value_exchangeRequestId && !value_exchangeRequestHash) {
            const currencyInId = youGive.id;
            const currencyOutId = youGet.id;
            const amountOut = amountGet;
            const amountIn = Number(amountGive);
            const networkId = network.id;
            const partnerName = partner;
            const exchangeRequestUserAgentInfo = {
                windowInnerWidth: window.innerWidth,
                windowInnerHeight: window.innerHeight,
                browserScreenColorDepth: window.screen.colorDepth,
                browserJavaEnabled: true,
                browserTimeZone: 0,
                browserScreenWidth: window.screen.width,
                browserScreenHeight: window.screen.height
            };
            const params = { currencyInId, currencyOutId, amountIn, amountOut, networkId, partnerName, exchangeRequestUserAgentInfo };
            setLoading(true)
            setDisableButton(true)
            requests.Exchange(params).then(response => {
                setLoading(false)
                setDisableButton(false)
                if (response?.exchangeRequestId && response.hash && response.tradeUserId) {
                    props.action_getInstanceState({
                        value_exchangeRequestId: response.exchangeRequestId,
                        value_exchangeRequestHash: response.hash,
                        value_tradeUserId: response.tradeUserId,
                        selected_youGive: selectedYouGive,
                        selected_youGet: selectedYouGet,
                        value_youGive: amountGive,
                        value_youGet: amountGet,
                        value_network: activeNetwork,
                        

                    });
                    props.setStep(2)
                } else {
                    setError('Internal server Error. Please contact technical support')
                }
            })
        } else if (verify_contact) props.setStep(3)
        else { props.setStep(2) }
    }

    return (
        <div className={styles.orderData}>
            {/* <div className={styles.orderData__header}>
                <span>Buy {selectedYouGet}</span>
                <div className={styles.orderData__logoGroup}>
                    <img src={pci} alt="PCI" className={styles.pci} />
                    <img src={visa} alt="visa" className={styles.visa} />
                    <img src={mastercard} alt="mastercard" className={styles.mastercard} />
                </div>
            </div> */}
            <div className={styles.orderData__currencyes}>

                
                    <div className={styles.orderDataGive}>You Give</div>
                    <YouGive
                        currency={selectedYouGive}
                        selectedGive={(curr) => {
                            setSelectedYouGive(curr);
                            props.setCurrencyGive(curr)
                        }}
                        amount={amountGive}
                        setAmountGive={(value) => {
                            setAmountGive(value)
                            props.setValueSelected(value)
                        }}
                        items={props.currencyes.fiat.map((curr) => ({ id: curr.id, name: curr.shortName }))}
                        error={errorGive}
                        disabled={disabledGive}
                        priceOneCrypto={priceOneCrypto}
                    />
                    <svg width="24" height="24" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7463 6.76172C15.0179 6.76172 15.2821 6.67332 15.499 6.50988C15.7159 6.34645 15.8737 6.11685 15.9486 5.85579C16.0235 5.59473 16.0113 5.3164 15.914 5.06285C15.8167 4.80929 15.6395 4.5943 15.4092 4.45037L12.0485 1.0884C11.9323 0.972274 11.7944 0.880177 11.6426 0.817362C11.4908 0.754548 11.3281 0.722249 11.1638 0.722306C10.9995 0.722364 10.8368 0.754779 10.6851 0.817701C10.5333 0.880623 10.3955 0.972817 10.2793 1.08902C10.1632 1.20523 10.0711 1.34317 10.0083 1.49497C9.94549 1.64677 9.91319 1.80945 9.91325 1.97373C9.91331 2.13801 9.94572 2.30068 10.0086 2.45243C10.0716 2.60419 10.1638 2.74206 10.28 2.85818L11.6808 4.259L2.23901 4.259C1.9073 4.259 1.58917 4.39078 1.35461 4.62533C1.12005 4.85989 0.988281 5.17802 0.988281 5.50974C0.988281 5.84145 1.12005 6.15958 1.35461 6.39414C1.58917 6.6287 1.9073 6.76047 2.23901 6.76047L14.6838 6.76047L14.7463 6.76047L14.7463 6.76172Z" fill="#ADADAD" />
                        <path d="M7.24195 9.22295C6.97036 9.22295 6.70616 9.31135 6.48926 9.47479C6.27236 9.63822 6.11455 9.86782 6.03968 10.1289C5.96481 10.3899 5.97694 10.6683 6.07425 10.9218C6.17156 11.1754 6.34876 11.3904 6.57906 11.5343L9.93978 14.895C10.0552 15.0145 10.1932 15.1098 10.3458 15.1753C10.4984 15.2409 10.6625 15.2754 10.8285 15.2768C10.9946 15.2783 11.1593 15.2466 11.313 15.1837C11.4667 15.1208 11.6064 15.028 11.7238 14.9105C11.8412 14.7931 11.9341 14.6534 11.997 14.4997C12.0599 14.346 12.0915 14.1813 12.0901 14.0153C12.0887 13.8492 12.0542 13.6851 11.9886 13.5325C11.9231 13.3799 11.8278 13.2419 11.7083 13.1265L10.3075 11.7244L19.7493 11.7244C20.081 11.7244 20.3991 11.5926 20.6337 11.3581C20.8682 11.1235 21 10.8054 21 10.4737C21 10.142 20.8682 9.82384 20.6337 9.58928C20.3991 9.35473 20.081 9.22295 19.7493 9.22295L7.30448 9.22295L7.24195 9.22295Z" fill="#ADADAD" />
                    </svg>
                    <span className={styles.orderData__currencyes__give}>You Get</span>
                <YouGet
                    currency={selectedYouGet}
                    selectedGive={(curr) => {
                        setSelectedYouGet(curr)
                        props.setCurrencyGet(curr)}}
                    amount={amountGet}
                    items={props.currencyes.crypto.map((curr) => ({ id: curr.id, name: curr.shortName }))}
                    disabled={disabledGet}
                    loader={loadingGet}
                />
            </div>
            {/* <ul className={styles.networksList}>
                 {
                    ( networks.map(network => 
                        <li key={network.shortName}
                        onClick={() => setActiveNetwork(network.shortName)}
                        className={`${activeNetwork === network.shortName && styles.networkActive}`}
                        >{network.shortName}</li>
                    ))
                } 
            </ul> */}
            {/* <Input
                label={'Recipient’s address'}
                error={errorWallet}
                value={addressWallet}
                disabled={disabledWallet}
                required={'required'}
                onChange={(value) => validateWallet(value)}
                onPaste={(value) => validateWallet(value)}
                onBlur={(value) => validateWallet(value)}
            /> */}


            <div className={styles.orderData__buttonBlock}>
                {/* <Button type={'button'} onClick={() => console.log('Cancel payment')} disabled={false} className={'text'} title={'Cancel payment'} /> */}
                {/* <Button type={'button'} onClick={() => setModalActive(true)} loading={loading} className={'button'} title={'Buy Crypto now'}
                />  */}
                <div className={styles.orderData__logoGroup}>
                    <img src={pci} alt="PCI" className={styles.pci} />
                    <img src={visa} alt="visa" className={styles.visa} />
                    <img src={mastercard} alt="mastercard" className={styles.mastercard} />
                </div>
                
            </div>
            <MessageBox text={error} clearMessage={() => setError(null)} />
        </div>
    )
}


// Хук useDebounce для обработки множественного вызова конвертера
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const handler = setTimeout(() => { setDebouncedValue(value) }, delay);
            return () => { clearTimeout(handler) }
        },
        [value]
    )
    return debouncedValue;
}

export default connect(
    state => ({
        getInstanceState: state.getInstanceState,
        currencyes: state.currencyes,
    }),
    dispatch => ({
        action_getInstanceState: (obj) => {
            dispatch(action_getInstanceState(obj));
        },
        action_currencyes: (obj) => {
            dispatch(action_currencyes(obj));
        },
    })
)(OrderDataTest);