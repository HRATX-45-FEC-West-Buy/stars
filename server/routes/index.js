const infoStars = require("./infoStars");
const carouselStars = require("./carouselStars");


module.exports = app => {
    app.use('/info', infoStars);
    app.use('/carousel', carouselStars);
}