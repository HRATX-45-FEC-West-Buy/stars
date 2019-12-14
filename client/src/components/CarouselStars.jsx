import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

//styles are necessary to render the correct star rating in the stars <i> tag below

import "./CarouselStars.scss";

//The "stars-small" component size must stay 90x18px
//The stars-bby.png background image asset is required to render star ratings - customize local path in Reviews.css
export default class CarouselStars extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            productId: 54,
            ratingData: {average_rating: 0, total_ratings: 0},
            starClasses: "stars stars-small stars-small-0-0"
        }
    }

  componentDidMount() {
    axios
      .get(`/carousel/${this.state.productId}`)
      .then(data => {
        console.log("Data from info stars get request: ", data.data);
        this.setState({ ratingData: data.data }, () => {
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

  render () {
    return (
        <div id="carousel-stars-container">
          <span className="carousel-star-graphic">
            <i className={this.state.starClasses}></i>
            <span className="carousel-star-graphic-review-count">
              <span className="carousel-star-graphic-total-reviews">
                  <a href="#">({this.state.ratingData.total_ratings})</a>
              </span>
            </span>
          </span>
        </div>
      );
  }
 
};

CarouselStars.propTypes = {
  productId: PropTypes.number,
  avgRating: PropTypes.number,
  reviewCount: PropTypes.number
};

