function Calculator() {
    const mathOperations = {
      "+": (x, y) => x + y,
      "-": (x, y) => x - y,
      "*": (x, y) => x * y,
      "/": (x, y) => x / y
    };
  
    function calculate(str, regex) {
      return str.replace(regex, (_match, arg1, operator, arg2) =>
        mathOperations[operator](parseFloat(arg1), parseFloat(arg2))
      );
    }

    function highPrecedence(str) {
      const regex = /([-]?[\d.]+)([*\/])([-]?[\d.]+)/;
      const str2 = calculate(str, regex);
      return str === str2 ? str : highPrecedence(str2);
    };
  
    function lowPrecedence(str) {
      const regex = /([-]?[\d.]+)([+-])([-]?[\d.]+)/;
      const str2 = calculate(str, regex);
      return str === str2 ? str : lowPrecedence(str2);
    };
  
    function process(str) {
      const firstPass = highPrecedence(str);
      const secondPass = lowPrecedence(firstPass);
      return parseFloat(secondPass);
    };

    return process;
  }

  module.exports.calculate = Calculator();