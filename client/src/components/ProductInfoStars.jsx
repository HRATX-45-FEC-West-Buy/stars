import React from "react";
import PropTypes from "prop-types";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import $ from "jquery";
import PopoverBar from "./PopoverBar.jsx";

//styles are necessary to render the correct star rating in the stars <i> tag below
import "./ProductInfoStars.scss";
import axios from "axios";

//The "stars-small" component size must stay 90x18px
//The stars-bby.png background image asset is required to render star ratings - customize local path in Reviews.css
export default class ProductInfoStars extends React.Component {
  constructor(props) {
    super(props);

    console.log("Inside Product Info Star's constructor function");
    this.state = {
      productId: 10,
      reviewData: {
        average_rating: 0,
        five_star: 0,
        four_star: 0,
        one_star: 0,
        product_id: 0,
        review_count: 0,
        three_star: 0,
        two_star: 0,
        would_recommend_pct: 0
      },
      starRatings: [0, 0, 0, 0, 0],
      starClasses: "stars stars-small stars-small-0-0",
      popoverOpen: false
    };

    this.popoverStyles = {
      width: "300px",
      height: "240px",
      "max-width": "300px"
    };
    this.popoverContentStyles = {
      padding: "30px",
      width: "300px",
      height: "240px"
    };

    this.toggleCaret = this.toggleCaret.bind(this);
  }

  componentDidMount() {
    console.log("Stars mounting");
    const getProductID = () => {
      let productUrl = window.location.href;
      let urlBits = productUrl.split("/");
      console.log("id parsed from URL in Stars component: ", urlBits[urlBits.length - 2]);
      return urlBits[urlBits.length - 2];
    };
    let productId = parseInt(getProductID());
    this.setState({ productId }, () => {
      axios
        .get(`http://pi-stars.us-east-2.elasticbeanstalk.com/info/${this.state.productId}`)
        // .get(`/info/${this.state.productId}`)
        .then(data => {
          console.log("Data from info stars get request: ", data.data);
          this.setState({ reviewData: data.data }, () => {
            const starClasses = `stars stars-small stars-small-${
              data.data.average_rating.toFixed(1)[0]
            }-${data.data.average_rating.toFixed(1)[2]}`;
            this.setState({ starClasses });
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.reviewData.product_id !== this.state.reviewData.product_id) {
      const starRatings = [
        this.state.reviewData.five_star,
        this.state.reviewData.four_star,
        this.state.reviewData.three_star,
        this.state.reviewData.two_star,
        this.state.reviewData.one_star
      ];

      this.setState({ starRatings });
    }
  }

  toggleCaret() {
    console.log("toggleCaret called!");
    if (!this.state.popoverOpen) {
      $(".product-info-ratings-caret").addClass("up");
    } else if (this.state.popoverOpen) {
      $(".product-info-ratings-caret").removeClass("up");
    }
    this.setState(state => {
      return { popoverOpen: !state.popoverOpen };
    });
  }

  render() {
    return (
      <div className="star-graphic-container">
        <span className="star-graphic">
          <i className={this.state.starClasses}></i>
          <span className="star-graphic-review-count">
            <span className="star-graphic-total-reviews">
              <strong>{this.state.reviewData.average_rating + " "}</strong>(
              {this.state.reviewData.review_count} Reviews)
            </span>
          </span>
          <span className="rating-caret-wrapper" onClick={this.toggleCaret}>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover
                  id="product-info-rating-bar-popover"
                  style={this.popoverStyles}
                >
                  <Popover.Content style={this.popoverContentStyles}>
                    <div style={{ width: "100%", height: "100%" }}>
                      <div className="bars-container">
                        {this.state.starRatings.map((count, index) => {
                          let ratings = { 0: 5, 1: 4, 2: 3, 3: 2, 4: 1 };
                          return (
                            <PopoverBar
                              starRating={ratings[index]}
                              ratingCount={count}
                              totalRatings={this.state.reviewData.review_count}
                              key={index}
                            />
                          );
                        })}
                      </div>
                      <div className="reviews-link">
                        <a href="#">Read Reviews</a>
                      </div>
                    </div>
                  </Popover.Content>
                </Popover>
              }
            >
              <i className="product-info-ratings-caret"></i>
            </OverlayTrigger>
          </span>
        </span>
      </div>
    );
  }
}
