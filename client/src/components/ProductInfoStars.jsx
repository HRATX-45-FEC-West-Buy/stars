import React from "react";
import PropTypes from "prop-types";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import $ from "jquery";

//styles are necessary to render the correct star rating in the stars <i> tag below

import "./ProductInfoStars.scss";
import axios from "axios";

//The "stars-small" component size must stay 90x18px
//The stars-bby.png background image asset is required to render star ratings - customize local path in Reviews.css
export default class ProductInfoStars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 54,
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
      starClasses: "stars stars-small stars-small-0-0",
      popoverOpen: false
    };

    this.toggleCaret = this.toggleCaret.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/info/${this.state.productId}`)
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
        console.log;
      });
  }

  toggleCaret() {
    console.log("toggleCaret called!")
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
                <Popover id="product-info-rating-bar-popover">
                  <Popover.Content>RATING BARS!</Popover.Content>
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
