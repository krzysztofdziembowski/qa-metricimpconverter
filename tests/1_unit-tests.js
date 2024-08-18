const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("whole number", () => {
        assert.equal(convertHandler.getNum("14kg"), 14);
    })
    test("dec number", () => {
        assert.equal(convertHandler.getNum("14.1kg"), 14.1);
    })
    test("frac number", () => {
        assert.equal(convertHandler.getNum("14/2kg"), 7);
    })
    test("frac dec number", () => {
        assert.equal(convertHandler.getNum("14.1/2kg"), 7.05);
    })
    test('double frac', () => {
        assert.throws(() => convertHandler.getNum("3/2/3kg"))
        assert.isTrue(true);
    })
    test("default number", () => {
        assert.equal(convertHandler.getNum("kg"), 1);
    })
    test("valid unit", () => {
        assert.equal(convertHandler.getUnit("kg"), "kg");
    })
    test("invalid unit", () => {
        assert.throws(() => convertHandler.getUnit("k"))
        assert.isTrue(true);
    })
    test("return unit", () => {
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
    })
    test("spell unit", () => {
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        assert.equal(convertHandler.spellOutUnit('L'), 'liters')
    })
    test("kg to lbs", () => {
        assert.equal(convertHandler.convert(14, 'kg'), 30.86474)
    })
    test("lbs to kg", () => {
        assert.equal(convertHandler.convert(14, 'lbs'), 6.35029)
    })
    test("km to mi", () => {
        assert.equal(convertHandler.convert(14, 'km'), 8.69922)
    })
    test("mi to km", () => {
        assert.equal(convertHandler.convert(14, 'mi'), 22.53076)
    })
    test("L to gal", () => {
        assert.equal(convertHandler.convert(14, 'L'), 3.69841)
    })
    test("gal to L", () => {
        assert.equal(convertHandler.convert(14, 'gal'), 52.99574)
    })
});