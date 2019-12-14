import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

//styles are necessary to render the correct star rating in the stars <i> tag below

import "./SearchStars.scss";

//The "stars-small" component size must stay 90x18px
//The stars-bby.png background image asset is required to render star ratings
export default class SearchStars extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            productId: 54,
            ratingData: {average_rating: 0},
            starClasses: "stars stars-small stars-small-0-0"
        }
    }

  componentDidMount() {
    axios
      .get(`/search/${this.state.productId}`)
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
        <div id="search-stars-container">
          <span className="search-star-graphic">
            <i className={this.state.starClasses}></i>
            <span className="search-star-graphic-review-count">
              <span className="search-star-graphic-total-reviews">
                  <a href="#"><strong>{this.state.ratingData.average_rating}</strong></a>
              </span>
            </span>
          </span>
        </div>
      );
  }
 
};

SearchStars.propTypes = {
  productId: PropTypes.number,
  avgRating: PropTypes.number,
  reviewCount: PropTypes.number
};

