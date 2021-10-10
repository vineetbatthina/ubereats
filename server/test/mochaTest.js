var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

describe("MochaTestUberEatsApplication", function () {

        describe('Get Restaurant Profile Based on EmailId', function () {
    
            it('it should give customer email',() => {
                chai.request(app).post("/api/getRestaurantProfile")
                    .send({ 
                        emailId : "main@gmail.com"
                    })
                    .then(function (res) {
                        expect(JSON.parse(res.text).owner_email).to.equal("main@gmail.com");
                    })
                    .catch(error => {    
                        console.log(error);
                    });
            });
        });

        describe('Get Customer Profile Based on EmailId', function () {
    
            it('it should not give results',() => {
                chai.request(app).post("/api/getCustomerProfileByEmailId")
                    .send({ 
                        emailId : "batthina.vineet@gmail.com"
                    })
                    .then(function (res) {
                        expect(res.length>0).to.equal(false);
                    })
                    .catch(error => {    
                        console.log(error);
                    });
            });
        });

        describe('Get Customer Orders Based on EmailId', function () {
    
            it('it should give orders amounting to greater than zero',() => {
                chai.request(app).post("/api/getOrdersByCustEmail")
                    .send({ 
                        emailId : "batthina.vineet@gmail.com"
                    })
                    .then(function (res) {
                        expect(res.length>0).to.equal(false);
                    })
                    .catch(error => {    
                        console.log(error);
                    });
            });
        });


        describe('Get Restaurant Dishes Based on EmailId', function () {
    
            it('it should give Dishes amount greater than Zero',() => {
                chai.request(app).post("/api/getDishes")
                    .send({ 
                        emailId : "main@gmail.com"
                    })
                    .then(function (res) {
                        expect(res.length>0).to.equal(false);
                    })
                    .catch(error => {    
                        console.log(error);
                    });
            });
        });

        describe('Get Dishes of Restaurant Based By Id', function () {
    
            it('it should give Dishes count greater than zero',() => {
                chai.request(app).post("/api/getDishesbyResId")
                    .send({ 
                        restaurantId : "1"
                    })
                    .then(function (res) {
                        expect(res.length>0).to.equal(false);
                    })
                    .catch(error => {    
                        console.log(error);
                    });
            });
        });

});
