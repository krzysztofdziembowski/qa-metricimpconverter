'use strict'
let { calculate } = require('../calculator.js')

function ConvertHandler() {
  const inputFormat = /(\d*\.?\d*(?:\/\d*\.?\d*)?(\/\d*\.?\d*)*)(\w*)/

  const unitConvertion = {
    'gal': {
      spell: 'gallons',
      convertsTo: 'L',
      rate: 3.78541
    },
    'l': {
      proper: 'L',
      spell: 'liters',
      convertsTo: 'gal',
      rate: 1/3.78541
    },
    'mi': {
      spell: 'miles',
      convertsTo: 'km',
      rate: 1.60934
    },
    'km': {
      spell: 'kilometers',
      convertsTo: 'mi',
      rate: 1/1.60934
    },
    'lbs': {
      spell: 'pounds',
      convertsTo: 'kg',
      rate: 0.453592
    },
    'kg': {
      spell: 'kilograms',
      convertsTo: 'lbs',
      rate: 1/0.453592
    },
  }

  const isRequired = () => { throw new Error('param is required'); };
  
  this.getNum = function(input = isRequired()) {
    let match = inputFormat.exec(input);

    if(match[1] === "")
      match[1] = "1";

    if(match[2] !== undefined) {
      throw Error("invalid number")
    }

    let valueString = match[1];
    let value = calculate(valueString)
    return value;
  };
  
  this.getUnit = function(input = isRequired()) {
    let match = inputFormat.exec(input);
    let unitString = match[3].toLowerCase();

    if(!Object.keys(unitConvertion).includes(unitString)) {
      throw Error("invalid unit")
    }

    return unitConvertion[unitString].proper || unitString;
  };
  
  this.getReturnUnit = function(initUnit = isRequired()) {
    let unitString = initUnit.toLowerCase();
  
    if(!Object.keys(unitConvertion).includes(unitString)) {
      throw Error("invalid unit")
    }

    let result = unitConvertion[unitString].convertsTo;
    return result;
  };

  this.spellOutUnit = function(unit = isRequired()) {
    let unitString = unit.toLowerCase();
  
    if(!Object.keys(unitConvertion).includes(unitString)) {
      throw Error("invalid unit")
    }

    let result = unitConvertion[unitString].spell;
    return result;
  };
  
  this.convert = function(initNum = isRequired(), initUnit = isRequired()) {
    let match = inputFormat.exec(initNum);
    let unitString = initUnit.toLowerCase();
    let error = '';

    if(match[1] === "")
      match[1] = "1";

    if(match[2] !== undefined) {
      error = "invalid number";
    }

    if(!Object.keys(unitConvertion).includes(unitString)) {
      error += error == '' ? "invalid unit" : " and unit";
    }

    if(error != '')
      throw Error(error)

    let result = initNum * unitConvertion[unitString].rate;
    result = parseFloat(result.toFixed(5))
    return result;
  };
  
  this.getString = function(initNum = isRequired(), initUnit = isRequired(), returnNum = isRequired(), returnUnit = isRequired()) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
