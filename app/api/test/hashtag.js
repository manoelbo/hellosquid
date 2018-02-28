'use strict';

const mongoose = require('mongoose');
const app = require('../..');
const Hashtag = mongoose.model('Hashtag');
const apiURL = '/api/v1/';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Hashtags API', () => {
    beforeEach(done => {
        Hashtag.remove({}, err => {
            done();
        });
    });

    describe('/GET hashtags', () => {
        it('it should GET all hashtags', done => {
            chai
                .request(app)
                .get(`${apiURL}/hashtags`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST hashtags', () => {
        it('it should POST a hashtag', done => {
            const hashtag = {
                hashtag: 'teste'
            };
            chai
                .request(app)
                .post(`${apiURL}/hashtags`)
                .send(hashtag)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('hashtag');
                    done();
                });
        });
        it('it should NOT POST a hashtag without a hashtag property', done => {
            const hashtag = {
                teste: 'teste'
            };
            chai
                .request(app)
                .post(`${apiURL}/hashtags`)
                .send(hashtag)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');

                    done();
                });
        });
        it('it should NOT POST repeated hashtags', done => {
            const hashtag = {
                hashtag: 'teste'
            };

            const firstHashtag = new Hashtag(hashtag);
            firstHashtag.save((err, firsthashtag) => {
                chai
                    .request(app)
                    .post(`${apiURL}/hashtags`)
                    .send(hashtag)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errmsg');
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id hashtags', () => {
        it('it should DELETE a hashtag given the id', done => {
            const hashtag = new Hashtag({
                hashtag: 'teste'
            });
            hashtag.save((err, hashtag) => {
                chai
                    .request(app)
                    .delete(`${apiURL}/hashtags/${hashtag.id}`)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });
    });

    describe('/SEARCH/ hashtags', () => {
        it('it should QUERY instagram hashtag search api and GET medias ' , (done) => {
            chai
                .request(app)
                .get(`${apiURL}/hashtags/search/teste`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    done()
                })
        });
    });
});
