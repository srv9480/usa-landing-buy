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

// request
import requests from "@requests/request";

// img
import mastercard from '@assets/images/icons/mastercard.svg'
import pci from '@assets/images/icons/pci.svg'
import visa from '@assets/images/icons/visa.png'

const WalletData = (props) => {
    // Query параметры из URL
    const [searchParams] = useSearchParams();
    const query = [...searchParams.entries()]
        .reduce((acc, val) => {
            const [key, value] = val
            return { ...acc, [key]: value }
        }, {})

    // YouGive
    const [selectedYouGive, setSelectedYouGive] = useState(props.currencyGive);
    const [amountGive, setAmountGive] = useState(null);
    const [disabledGive, setDisabledGive] = useState(false)
    const debouncedValue = useDebounce(amountGive, 500)
    const [errorGive, setErrorGive] = useState(null);
    const [priceOneCrypto, setPriceOneCrypto] = useState(null)

    // YouGet
    const [selectedYouGet, setSelectedYouGet] = useState(props.currencyGet);
    const [amountGet, setAmountGet] = useState(props.valueGet);
    const [disabledGet, setDisabledGet] = useState(false)
    const [loadingGet, setloadingGet] = useState(false)

    // DestinationAddress
    const [addressWallet, setAddressWallet] = useState(null)
    const [errorWallet, setErrorWallet] = useState(false)
    const [disabledWallet, setDisabledWallet] = useState(false)

    // Networks
    const [networks, setNetworks] = useState([])
    const [activeNetwork, setActiveNetwork] = useState(null);

    // Общие
    const [partner, setPartner] = useState(null)
    const [disableButton, setDisableButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // const [modalActive, setModalActive] = useState(true);
    const [isModal, setModal] = React.useState(false);


    // Подгрузка списка сетей при смене криптовалюты и установка активной сети    
    useEffect(() => {
        setNetworks(props.currencyes.crypto.find((curr) => curr.shortName === selectedYouGet).networks)
        if (addressWallet) validateWallet(addressWallet)
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
            value_destinationAddress,
        } = props.getInstanceState
        if (selected_youGive && selected_youGet && value_network && value_youGive && value_youGet && value_destinationAddress) {
            return getInstanceParams()
        } else if (query && query.cur_from && query.cur_to && query.amount && query.address && query.email) return getQueryParams()
    }, [])

    // Включаем/Выключаем кнопку в зависимости от заполнения данных
    useEffect(() => {
        if (typeof amountGet === 'number' && !errorGive && addressWallet && !errorWallet) return setDisableButton(false)
        setDisableButton(true)
    }, [amountGet, addressWallet])

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
        validateWallet(query.address)
        // отключаем поля
        setDisabledGive(true)
        setDisabledGet(true)
        setDisabledWallet(true)
    }
    function getInstanceParams() {
        const {
            selected_youGive,
            selected_youGet,
            value_network,
            value_youGive,
            value_youGet,
            value_destinationAddress,
            value_partnerName
        } = props.getInstanceState
        setSelectedYouGive(selected_youGive)
        setSelectedYouGet(selected_youGet)
        setAmountGive(value_youGive)
        validateWallet(value_destinationAddress)
        setActiveNetwork(value_network)
        setAmountGet(value_youGet)
        setPartner(value_partnerName)
        // отключаем поля
        setDisabledGive(true)
        setDisabledGet(true)
        setDisabledWallet(true)
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
        }).catch(error => {
            if (error.response.status === 400) setErrorGive(error.response.data)
            else setErrorGive('internal Server Error')
        })
        setloadingGet(false)
    }

    const validateWallet = (value) => {
        console.log(value);
        setAddressWallet(value)
       
        const youGet = props.currencyes.crypto.find((curr) => curr.shortName === selectedYouGet)
        const valueRegExp = youGet.networks.find((network) => network.shortName === activeNetwork) || youGet.networks[0]
        if (valueRegExp && RegExp(valueRegExp.addressVerificationRegExp).test(value)) setErrorWallet(false)
        else {
            setErrorWallet(true)
            setDisabledWallet(false)
        }
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
            const cryptoAddress = addressWallet;
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
            const params = { currencyInId, currencyOutId, amountIn, amountOut, cryptoAddress, networkId, partnerName, exchangeRequestUserAgentInfo };
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
                        value_destinationAddress: addressWallet

                    });
                    props.setStep(2)
                    props.setFormData(((prevState) => ({
                        ...prevState,
                        addressWallet
                      })))
                } else {
                    setError('Internal server Error. Please contact technical support')
                }
            })
        } else if (verify_contact) {
            props.setStep(2) 
            props.setFormData(((prevState) => ({
                ...prevState,
                walletAddress: addressWallet
              })))}
        else { props.setStep(2) 
            props.setFormData(((prevState) => ({
                ...prevState,
                walletAddress: addressWallet
              })))}
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
            </div>
            
            <span style={{ fontSize: '20px', textAlign: "center", fontWeight: '600', color: "red", marginBottom: "100px" }}>Your Crypto Wallet</span>
            <Input
                label={'Recipient’s address'}
                error={errorWallet}
                value={addressWallet}
                disabled={disabledWallet}
                required={'required'}
                onChange={(value) => validateWallet(value)}
                onPaste={(value) => validateWallet(value)}
                onBlur={(value) => validateWallet(value)}
            />
            <div className={styles.orderData__buttonBlock}>
                {/* <Button type={'button'} onClick={() => console.log('Cancel payment')} disabled={false} className={'text'} title={'Cancel payment'} /> */}
                {/* <Button type={'button'} onClick={() => createRequest()} loading={loading} disabled={setDisableButton} className={'button'} title={'Buy Crypto now'}
                />  */}
                <Button type={'button'} onClick={() => createRequest(false)} loading={loading} disabled={false} className={'button'} title={'NEXT'}
                />
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
)(WalletData);