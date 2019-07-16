require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

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
			.post('/api/v1/memes')
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

	it('gets all memes with GET', async() => {
		const meme = await Meme.create({ image: 'lib/assets/child-fist.jpg' });

		return request(app)
			.get('/api/v1/memes')
			.then(res => {
				const memeJSON = JSON.parse(JSON.stringify(meme));
				expect(res.body).toEqual([memeJSON]);
			});
	});
});
