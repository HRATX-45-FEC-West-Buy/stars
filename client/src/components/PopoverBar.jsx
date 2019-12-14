import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";

export default class PopoverBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progressBarPct: 0
    };

    console.log("STAR RATING: ", this.props.starRating);
    console.log("RATING COUNT: ", this.props.ratingCount);
    console.log("TOTAL RATINGS: ", this.props.totalRatings);

    this.calculatePct = this.calculatePct.bind(this);
  }

  componentDidMount() {
    this.setState((state, props) => {
      console.log("RATING COUNT IN CDM: ", props.ratingCount);
      console.log("TOTAL RATINGS IN CDM: ", props.totalRatings);
      let pct = this.calculatePct(props.ratingCount, props.totalRatings);
      console.log("This is new pct on componentDidMount: ", pct);
      return { progressBarPct: pct };
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ratingCount !== this.props.ratingCount) {
      this.setState((state, props) => {
        let pct = this.calculatePct(
          this.props.ratingCount,
          this.props.totalRatings
        );
        console.log("This is new pct on componentDidUpdate: ", pct);
        return { progressBarPct: pct };
      });
    }
  }

  calculatePct(ratingCount, totalRatings) {
    let rc = ratingCount;
    let tr = totalRatings;
    console.log("The calculation: ", Math.round((rc / tr) * 100));
    return Math.round((rc / tr) * 100);
  }

  render() {
    return (
      <div className="bar">
        <div className="star-rating">
          <span className="star">{this.props.starRating}</span>
          <i className="gold-star"></i>
        </div>
        <div className="progress-bar">
          <span
            className="progress-bar-filled"
            style={{ width: this.state.progressBarPct + "%" }}
          ></span>
        </div>
        <div className="rating-count">{this.props.ratingCount}</div>
      </div>
    );
  }
}

PopoverBar.propTypes = {
  starRating: PropTypes.number,
  ratingCount: PropTypes.number,
  totalRatings: PropTypes.number
};
