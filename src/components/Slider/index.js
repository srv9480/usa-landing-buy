// import React, { Component } from "react";
// import Slider from "react-slick";
// import partner1 from "../../assets/images/partner1.png";
// import partner2 from "../../assets/images/partner2.png";
// import "./styles.css";

// export default class SimpleSlider extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       // infinite: true,
//       // speed: 500,
//       // slidesToShow: 1,
//       // slidesToScroll: 1
//     };
//     return (
//       <div className="partnerSlider">
//         <h2> Single Item</h2>
//         <Slider {...settings}>
//           <div>
//             <img src={partner1} alt="" />
//           </div>
//           <div>
//             <img src={partner2} alt="" />
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }


import React, {Component} from 'react';
import styles from './styles.scss';
import Slider from "react-slick";
import img1 from "../../assets/images/rectangleDotActiveGr.svg";
import img2 from "../../assets/images/rectangleDotLight.svg";
import partner1 from "../../assets/images/partner1.png";
import partner2 from "../../assets/images/partner2.png";
//import {Trans} from 'react-i18next';

export default class SimpleSlider extends Component {
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
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: true,
            beforeChange: (prev, next) => {
                this.setState({
                    dotIndex: next / 5
                });
            },
            customPaging: function(i) {
                if(i === state.dotIndex)
                    return (
                        <img src={img1} width={20} height={15} />
                    );
                else
                    return (
                        <img src={img2} width={20} height={15} />
                    );
            },
            dotsClass: "slick-dots slick-thumb",
            responsive: [
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                        arrows: false,
                        beforeChange: (prev, next) => {
                            this.setState({
                                dotIndex: next / 3
                            });
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
            <section className={styles.wrapper1}>
                <span className={styles.title}>
                        The best trust us
                </span>

                <div className={styles.sliderContainer}>
                    <Slider {...settings}>

                        <div className={styles.slide}>
                            <div>
                            
                                <img src={partner2} width="200px" height="50px" alt=""/>
                            </div>
                            <div>
                            
                                <img src={partner2} width="200px" height="50px" alt=""/>
                            </div>
                            <div>
                            
                                <img src={partner2} width="200px" height="50px" alt=""/>
                            </div>
                            <div>
                            
                            <img src={partner2} width="200px" height="50px" alt=""/>
                        </div>
            
                        </div>
                       
                    </Slider>
                </div>
            </section>
        );
    }
}
