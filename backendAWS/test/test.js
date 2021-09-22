const expect = require('chai').expect;

const request = require('supertest');
const app = require('../index.js');
var Food = require('../models/foodModel');
var mongoose = require('mongoose');


describe('CRUD API call tests', () => {
    let testFood;

    beforeEach((done) => {
        mongoose.connection.collections.foodlists.drop()

        testFood = new Food({ foodname: "HL Milk", expirydate: "1 Dec 2021", person: "Mark", phone: "88888888" });

        testFood.save()
            .then(() => {
                done();
            }).catch((err) => {
                console.log(err);
            });
    });

    afterEach((done) => {
        mongoose.connection.collections.foodlists.drop(() => {
            done();
        });
    });

    it('Successful GET call to find all food', (done) => {
        request(app)
            .get('/api/food')
            .then((res) => {
                expect(res.status).equal(200);
                expect(res.body.message).to.equal("Food retrieved successfully");
                expect(res.body.length).to.not.equal(0);
                done();
            })
    });

    it('Successful GET call to find food by ID', (done) => {
        request(app)
            .get(`/api/food/${testFood._id}`)
            .then((res) => {
                const foodData = res.body.data
                expect(res.status).equal(200);
                expect(res.body.message).equal('Food details loading');
                expect(foodData.foodname).equal('HL Milk');
                expect(foodData.expirydate).equal('1 Dec 2021');
                expect(foodData.person).equal('Mark');
                expect(foodData.phone).equal('88888888');
                done();
            })
    });

    it('Failed GET call to find food by ID', (done) => {
        request(app)
            .get(`/api/food/${5}`)
            .then((res) => {
                expect(res.status).equal(404);
                done();
            })
    });

    it('Successful POST call to add food', (done) => {
        request(app)
            .post('/api/food')
            .send({ foodname: 'Ice cream', expirydate: '1 Oct 2021', person: 'Jane', phone: '77777777' })
            .then((res) => {
                const foodData = res.body.data
                expect(res.status).equal(200);
                expect(res.body.message).to.equal('New food created!');
                expect(foodData.foodname).equal('Ice cream');
                expect(foodData.expirydate).equal('1 Oct 2021');
                expect(foodData.person).equal('Jane');
                expect(foodData.phone).equal('77777777');
                done();
            });

    });

    it('Failed POST call to add food due to missing compulsory inputs', (done) => {
        request(app)
            .post('/api/food')
            .send({})
            .then((res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });

    it('Successful DELETE call to delete selected food', (done) => {
        request(app)
            .delete(`/api/food/${testFood._id}`)
            .then(() => Food.findById(testFood._id))
            .then((Food) => {
                expect(!Food);
                done();
            })
    });

    it('Failed DELETE call to delete selected food due to wrong API route', (done) => {
        request(app)
            .delete(`/api/food/`)
            .then((res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });

    it('Successful PUT call to update selected food', (done) => {
        request(app)
            .put(`/api/food/${testFood._id}`)
            .send({ foodname: "Chocolate", expirydate: "1 Jan 2022", person: "John Doe", phone: "99999999" })
            .then(() => Food.findById(testFood._id))
            .then((food) => {
                expect(food.foodname).to.equal("Chocolate")
                expect(food.expirydate).to.equal("1 Jan 2022")
                expect(food.person).to.equal("John Doe")
                expect(food.phone).to.equal("99999999")
                done();
            })
    });

    it('Failed PUT call to update selected food due to missing compulsory inputs', (done) => {
        request(app)
            .put(`/api/food/${testFood._id}`)
            .send({})
            .then((res) => {
                expect(res.status).to.equal(404)
                done();
            })
    });
});