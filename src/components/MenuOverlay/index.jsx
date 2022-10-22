import React, { useState, useEffect, useRef } from "react";
// styles
import styles from "./styles.scss";
import { Input } from '@components/Button'

const MenuOverlay = (props) => {
    const [value, setValue] = useState(undefined)
    const [search, setSearch] = useState('')
    const outItems = props.items || [];
    const { ref, isShow, setIsShow } = useOutsideAlerter(false)

    useEffect(() => {
        if (props.value) setValue(props.value)
    }, [props]);

    useEffect(() => {
        if (isShow) {
            setSearch('');
            return;
        }
        null;
    }, [isShow])

    function selected(index) {
        const values = outItems.find((item) => item.id === index);
        if (values) { setValue(values.name), props.selected(values.name) }
    }

    // Вывод элементов массива после поиска
    function itemsMenu() {
        return outItems.filter(item => {
            if (item.longName) return item.longName.toLowerCase().includes(search.toLowerCase())
            console.log(item.name)
            return item.name.toLowerCase().includes(search.toLowerCase())
        })
    }

    function getListCurImg(cur) {
        try { return require(`../../assets/images/images-menu/${cur.toLowerCase()}.webp`).default }
        catch (err) { return null }
    }

    return (
        <div className={props.className} >
            <div className={`${styles.dropMenu} ${props.dropMenuStyle}`} onClick={() => { setIsShow(!isShow) }}>
                {getListCurImg(value) != null && !props.children && <img width={22} height={22} src={getListCurImg(value)} />}
                {props.children}
                {value && !props.children && <span>{value}</span>}
                {!props.disabled && <img src={require(`../../assets/images/icons/dropdown.svg`).default} />}
            </div>
            {
                !props.disabled && isShow &&
                <div className={styles.blackBack}>
                    <div className={styles.dropdown} ref={ref}>
                        <div className={styles.searchBox}>
                            <span className={styles.labelMenu}>{props.labelMenu}</span>
                            <Input
                                type={'search'}
                                label={'Search'}
                                value={search}
                                onChange={(value) => setSearch(value)}
                                onPaste={(value) => setSearch(value)}
                                onBlur={(value) => setSearch(value)}
                            />
                        </div>
                        <menu>
                            {
                                itemsMenu().map(item => {
                                    return (
                                        <li
                                            key={item.id}
                                            onClick={() => {
                                                selected(item.id);
                                                setSearch('')
                                                setIsShow(!isShow);
                                            }}
                                        >
                                            {getListCurImg(item.name)
                                                && <img className={styles.iconImg} width={22} height={22} src={getListCurImg(item.name)} />}
                                            <div className={styles.textBox}>
                                                <span>{item.name}</span>
                                                <p>{item.longName ? item.longName : null}</p>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </menu>
                    </div>
                </div>
            }
        </div>
    )
}

// Отслеживаение клика вне области
function useOutsideAlerter(initialIsVisible) {
    const [isShow, setIsShow] = useState(initialIsVisible)
    const ref = useRef(null)
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) { setIsShow(false) }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => document.removeEventListener('click', handleClickOutside, true)
    });
    return { ref, isShow, setIsShow }
}

export default MenuOverlay;