import React from "react";
import styles from "./styles.scss";
import { Link, animateScroll as scroll } from "react-scroll";

const FooterBlock = () => {
  return (
    <div className={styles.footerSection}>
      <div className={styles.footerBlock}>
        <div className={styles.footerLeft}>
          <p className={styles.footerText}>
            The Content is for informational purposes only, you should not
            construe any such information or other material as legal, tax,
            investment, financial, or other advice.
          </p>
        </div>
        <div className={styles.footerRight}>
          <ul className={styles.menuFooter}>
            <Link
              activeClass="active"
              to="section1"
              spy={true}
              smooth={true}
              offset={-70}
              duration={900}
            >
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
              <li>How to buy Crypto</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterBlock;
