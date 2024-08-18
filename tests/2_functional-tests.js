const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { json } = require('body-parser');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("convert gal", (done) => {
        testConvert("14gal", {
            initNum: 14,
            initUnit: 'gal',
            returnNum: 52.99574,
            returnUnit: 'L',
            string: '14 gallons converts to 52.99574 liters'
        }, done)
    })

    test("convert L", (done) => {
        testConvert("14L", {
            initNum: 14,
            initUnit: 'L',
            returnNum: 3.698408,
            returnUnit: 'gal',
            string: '14 liters converts to 3.698408 gallons'
        }, done)
    })

    test("convert mi", (done) => {
        testConvert("14mi", {
            initNum: 14,
            initUnit: 'mi',
            returnNum: 22.53076,
            returnUnit: 'km',
            string: '14 miles converts to 22.53076 kilometers'
        }, done)
    })

    test("convert km", (done) => {
        testConvert("14km", {
            initNum: 14,
            initUnit: 'km',
            returnNum: 8.699194,
            returnUnit: 'mi',
            string: '14 kilometers converts to 8.699194 miles'
        }, done)
    })

    test("convert lbs", (done) => {
        testConvert("14lbs", {
            initNum: 14,
            initUnit: 'lbs',
            returnNum: 6.350288,
            returnUnit: 'kg',
            string: '14 pounds converts to 6.350288 kilograms'
        }, done)
    })

    test("convert kg", (done) => {
        testConvert("14kg", {
            initNum: 14,
            initUnit: 'kg',
            returnNum: 30.86468,
            returnUnit: 'lbs',
            string: '14 kilograms converts to 30.86468 pounds'
        }, done)
    })
});

function testConvert(input, output, done) {
    chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=' + input)
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, JSON.stringify(output));
            done();
        });
}