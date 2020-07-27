const handlerInfoDetail = require("./controller");

module.exports = {
  getDetailsInfoLast(req, res, next) {
    handlerInfoDetail
      .getDetailsLast()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        next(err);
      });
  },

  getDetailsInfoValues(req, res, next) {
    handlerInfoDetail
      .getDetailsValues(req.body)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        next(err);
      });
  },
};
