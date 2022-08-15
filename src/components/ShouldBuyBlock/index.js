import React from "react";
import styles from "./styles.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import rectangleDotActiveGr from "../../assets/images/rectangleDotActiveGr.svg"
import rectangleDotLight from "../../assets/images/rectangleDotLight.svg"

const ShouldBuyBlock = () => {
  const [dotIndex, setDotIndex] = React.useState(0)
  const settings = {
    dots: true,
    autoplay: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setDotIndex( next / 5);
  },
            customPaging: function (i) {
                if (i === dotIndex)
                    return (
                        <img style={{display: "none"}} src={rectangleDotActiveGr} width={20} height={15} />
                    );
                else
                    return (
                        <img style={{display: "none"}} src={rectangleDotLight} width={20} height={15} />
                    );
            },
            dotsClass: "slick-dots slick-thumb",
            responsive: [
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                        arrows: false,
                        beforeChange: (prev, next) => {
                          setDotIndex( next / 5);
                        },
                        customPaging: function (i) {
                            if (i === dotIndex)
                                return (
                                    <img style={{display: "none"}} src={rectangleDotActiveGr} width={20} height={15} />
                                );
                            else
                                return (
                                    <img style={{display: "none"}} src={rectangleDotLight} width={20} height={15} />
                                );
                        },
                    }
                },
            ],
  };
  return (
    <div id="section2">
      <div className={styles.headerBlock}>
        <div className={styles.headerLeft}>
          <p style={{fontWeight: 600}}>Should I buy cryptocurrency?</p>
        </div>
        <div className={styles.headerRight}>
          <div>
            <p style={{marginBottom: 30}}>
              Legit question. Obviously, our team is very enthusiastic and we
              strongly believe in the crypto mass adoption and groundbreaking
              potential of blockchain technology, otherwise, we wouldn’t be
              there.{" "}
            </p>
            <p>
              Either way, our advice is corrupted by default, thus we recommend
              you to check why our clients are buying cryptocurrency:
            </p>
          </div>
        </div>
      </div>
      <div>
        <Slider {...settings}>
          <div>
            <div
                className={styles.slider}
            >
              <div className={styles.sliderBlock}>
                <div className={styles.sliderText}>
                  <div>
                    <p>
                      "I stick with the rule of trusting my own experience, and
                      with crypto it’s the same. I wanted to form my own opinion
                      and bought some BTC, luckily before that remarkable bull
                      run. I started with small purchase, but with the verified
                      account buying crypto is the matter of minutes so I just
                      keep an eye on the market situation and buy some coins
                      from time to time"
                    </p>
                  </div>
                  <div className={styles.subText}>
                    <p>John K.</p>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
                className={styles.slider}
            >
              <div className={styles.sliderBlock}>
                <div className={styles.sliderText}>
                  <div>
                    <p>
                      "I stick with the rule of trusting my own experience, and
                      with crypto it’s the same. I wanted to form my own opinion
                      and bought some BTC, luckily before that remarkable bull
                      run. I started with small purchase, but with the verified
                      account buying crypto is the matter of minutes so I just
                      keep an eye on the market situation and buy some coins
                      from time to time"
                    </p>
                  </div>
                  <div className={styles.subText}>
                    <p>John K.</p>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
                className={styles.slider}
            >
              <div className={styles.sliderBlock}>
                <div className={styles.sliderText}>
                  <div>
                    <p>
                      "I stick with the rule of trusting my own experience, and
                      with crypto it’s the same. I wanted to form my own opinion
                      and bought some BTC, luckily before that remarkable bull
                      run. I started with small purchase, but with the verified
                      account buying crypto is the matter of minutes so I just
                      keep an eye on the market situation and buy some coins
                      from time to time"
                    </p>
                  </div>
                  <div className={styles.subText}>
                    <p>John K.</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ShouldBuyBlock;
