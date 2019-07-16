require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
	beforeAll(() => {
		connect();
	});

	beforeEach(() => {
		return mongoose.connection.dropDatabase();
	});

	afterAll(() => {
		return mongoose.connection.close();
	});

	it('creates a meme with POST', () => {
		return request(app)
			.post('./api/v1/memes')
			.send({
				top: 'Those Dirty',
				image: 'lib/assets/child-fist.jpg',
				bottom: 'No. 2 Pencils'
			})
			.then(res => {
				expect(res.body).toEqual({
					_id: expect.any(String),
					top: 'Those Dirty',
					image: 'lib/assets/child-fist.jpg',
					bottom: 'No. 2 Pencils',
					__v: 0
				});
			});
	});
});
