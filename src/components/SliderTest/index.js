import React, { Component } from "react";
import Slider from "react-slick";
import waves from "../../assets/images/waves.png";
import entrepreneur from "../../assets/images/entrepreneur.png";
import cointelegraph from "../../assets/images/cointelegraph.png";
import changelly from "../../assets/images/changelly.png";
import yahoo from "../../assets/images/yahoo.png";
import coingeek from "../../assets/images/coingeek.png";
import rectangleDotActiveGr from "../../assets/images/rectangleDotActiveGr.svg"
import rectangleDotLight from "../../assets/images/rectangleDotLight.svg"
import styles from "./styles.scss"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dotIndex: 0
        }
    }

    render() {
        const state = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: true,
            beforeChange: (prev, next) => {
                this.setState({
                    dotIndex: next / 5
                });
            },
            customPaging: function (i) {
                if (i === state.dotIndex)
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
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true,
                        arrows: false,
                        beforeChange: (prev, next) => {
                            this.setState({
                                dotIndex: next / 3
                            });
                        },
                        customPaging: function (i) {
                            if (i === state.dotIndex)
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
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                        initialSlide: 2,
                        beforeChange: (prev, next) => {
                            this.setState({
                                dotIndex: next / 3
                            });
                        },
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                        initialSlide: 2,
                        beforeChange: (prev, next) => {
                            this.setState({
                                dotIndex: next / 3
                            });
                        },
                    }
                }
            ],
        };
        return (
            <div style={{ maxWidth: 1500, margin: "0 auto", paddingLeft: "80", marginBottom: 200 }}>
                <div className={styles.headerSlide} style={{width: "100%", display: "flex", justifyContent: "center", marginBottom: 25}}><h2>The best trust us</h2></div>
                <Slider {...settings}>
                    <div style={{display: "flex", justifyContent: "center"}}>

                        <img src={waves} alt="aves" />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src={entrepreneur} alt="entrepreneur" />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src={cointelegraph} alt="cointelegraph" />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src={changelly} alt="changelly" />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src={yahoo} alt="yahoo" />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src={coingeek} alt="coingeek" />
                    </div>
                </Slider>
            </div>
        );
    }
}