'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let errMessage = '';
    let initNum;
    let initUnit;

    try {
      initNum = convertHandler.getNum(input);
    } catch(error) {
      errMessage = "invalid number";
    }

    try {
      initUnit = convertHandler.getUnit(input);
    } catch(error) {
      errMessage += errMessage == '' ? "invalid unit" : " and unit";
    }

    if(errMessage != '') {
      res.json(errMessage)
      return;
    }

    try {
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      res.json({initNum, initUnit, returnNum, returnUnit, string})
    } catch(error) {
      res.json(error.message)
   }
  });
};
