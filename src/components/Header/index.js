import React, { useState } from "react";
import styles from "./styles.scss";
import logo from "../../assets/images/LogoHeader.svg";
import close from "../../assets/images/close.svg";
import menu from "../../assets/images/menu.svg";
import { Link, animateScroll as scroll } from "react-scroll";

const Header = () => {
  const [mobile, setMobile] = useState(false);
  return (
    <div className={styles.header}>
      <div
        className={styles.headerBlock}
        style={{ width: "75%", display: "flex", justifyContent: "center" }}
      >
        <div className={styles.headerLogo}>
          <img src={logo} />
        </div>
        {mobile ? (
          <div className={styles.menuMobile} onClick={() => setMobile(false)}>
            <img src={close} />
          </div>
        ) : (
          <div className={styles.menuMobile} onClick={() => setMobile(true)}>
            <img src={menu} />
          </div>
        )}
        <div className={styles.headerMenu}>
          <div>
            <ul className={styles.menuBlock}>
              <Link
                activeClass="active"
                to="section1"
                spy={true}
                smooth={true}
                offset={-70}
                duration={900}
              >
                {" "}
                <li>Buy Crypto</li>
              </Link>
              <Link
                activeClass="active"
                to="section2"
                spy={true}
                smooth={true}
                offset={-70}
                duration={900}
              >
                {" "}
                <li>Why Crypto</li>
              </Link>
              <Link
                activeClass="active"
                to="section3"
                spy={true}
                smooth={true}
                offset={-70}
                duration={900}
              >
                {" "}
                <li>Why Indacoin</li>
              </Link>
              <Link
                activeClass="active"
                to="section4"
                spy={true}
                smooth={true}
                offset={-70}
                duration={900}
              >
                {" "}
                <li>How to buy Crypto</li>
              </Link>
            </ul>
          </div>
        </div>
        {mobile && (
          <div className={styles.mobileMenu}>
            <div>
              <p
                className={styles.navItem}
                // style={{ color:"#8F83F3 !important", fontWeight:700}}
              >
                Buy Crypto
              </p>
            </div>
            <div>
              <p className={styles.navItem}>Why Crypto</p>
            </div>
            <div>
              <p className={styles.navItem}>Why Indacoin</p>
            </div>
            <div>
              <p className={styles.navItem}>How to buy Crypto</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
