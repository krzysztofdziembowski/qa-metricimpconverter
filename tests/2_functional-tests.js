const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { json } = require('body-parser');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("1", (done) => {
        assert.isTrue(true);
        testConvert("10L", {
            initNum: 10,
            initUnit: 'L',
            returnNum: 2.64172,
            returnUnit: 'gal',
            string: '10 liters converts to 2.64172 gallons'
        }, done)
    })

    test("2", (done) => {
        assert.isTrue(true);
        testConvert("32g", 'invalid unit', done)
    })

    test("3", (done) => {
        assert.isTrue(true);
        testConvert("3/7.2/4kg", 'invalid number', done)
    })

    test("4", (done) => {
        assert.isTrue(true);
        testConvert("3/7.2/4kilomegagram", 'invalid number and unit', done)
    })

    test("5", (done) => {
        assert.isTrue(true);
        testConvert("kg", {
            initNum: 1,
            initUnit: 'kg',
            returnNum: 2.20462,
            returnUnit: 'lbs',
            string: '1 kilograms converts to 2.20462 pounds'
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