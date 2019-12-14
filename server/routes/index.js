const infoStars = require("./infoStars");
const carouselStars = require("./carouselStars");
const searchStars = require("./searchStars");


module.exports = app => {
    app.use('/info', infoStars);
    app.use('/carousel', carouselStars);
    app.use('/search', searchStars);
}