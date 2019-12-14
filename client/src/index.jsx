import React from 'react';
import ReactDOM from 'react-dom';
import ProductInfoStars from './components/ProductInfoStars.jsx';
import CarouselStars from './components/CarouselStars.jsx';
import './assets/styles/bootstrap.min.css';

ReactDOM.render(<ProductInfoStars />, document.getElementById('product-info-stars'));
ReactDOM.render(<CarouselStars />, document.getElementById('carousel-stars'));