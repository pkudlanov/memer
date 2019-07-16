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

	it('gets a meme by id with GET/:id', async() => {
		const meme = await Meme.create({ image: 'lib/assets/child-fist.jpg' });

		return request(app)
			.get(`/api/v1/memes/${meme._id}`)
			.then(res => {
				expect(res.body).toEqual({
					_id: expect.any(String),
					image: 'lib/assets/child-fist.jpg',
					__v: 0
				});
			});
	});

	it('updates a meme by id with PUT/:id', async() => {
		const meme = await Meme.create({ image: 'lib/assets/child-fist.jpg' });

		return request(app)
			.put(`/api/v1/memes/${meme.id}`)
			.send({ top: 'Those Dirty', bottom: 'No. 2 Pencils' })
			.then(res => {
				expect(res.body.top).toEqual('Those Dirty');
				expect(res.body.bottom).toEqual('No. 2 Pencils');
			});
	});

	it('deletes a meme by id with DELETE/:id', async() => {
		const meme = await Meme.create({ image: 'lib/assets/child-fist.jpg' });

		return request(app)
			.delete(`/api/v1/memes/${meme.id}`)
			.then(res => {
				expect(res.body.image).toEqual('lib/assets/child-fist.jpg');
			});
	});
});
