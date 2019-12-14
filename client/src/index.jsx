import React from 'react';
import ReactDOM from 'react-dom';
import ProductInfoStars from './components/ProductInfoStars.jsx';
import CarouselStars from './components/CarouselStars.jsx';
import SearchStars from './components/SearchStars.jsx';
import './assets/styles/bootstrap.min.css';

console.log("Inside stars index.jsx");

const elByClass = document.getElementsByClassName("stars-carousel")
const carouselItems = [...elByClass];

console.log("carouselItems: ", carouselItems);


ReactDOM.render(<ProductInfoStars />, document.getElementById('product-info-stars'));
carouselItems.map((item, index) => ReactDOM.render(<CarouselStars productId={item.id} />, document.getElementById(''+item.id)))

// ReactDOM.render(<ProductInfoStars />, document.getElementById('product-info-stars'));
// ReactDOM.render(<CarouselStars />, document.getElementById('carousel-stars'));
// ReactDOM.render(<SearchStars />, document.getElementById('search-stars'));