const infoStars = require("./infoStars");


module.exports = app => {
    app.use('/info', infoStars);
}