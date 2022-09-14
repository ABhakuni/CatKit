import request from 'supertest';
import app from '../app.js';
import main from '../index.js';

let uploadedImageId = null

describe('testing post endpoint', () => {
  it('should create a new cat image', async () => {
    const res = await request(app)
      .post('/catkit')
      .set({'connection': 'keep-alive'})
      .field('name','cat test')
      .field('description', 'cat test image')
      .attach('image', './static/cat_2.jpg')
      .set('Content-Type', 'multipart/form-data')
    expect(res.statusCode).toEqual(200)
    let resJson = JSON.parse(res.text)
    uploadedImageId = resJson["_id"]
  })
})

describe('testing get endpoint', () => {
    it('should get all the cat images', async () => {
      const res = await request(app)
        .get('/catkit')
      expect(res.statusCode).toEqual(200)
    })
})

describe('testing get endpoint for getting single item', () => {
    it('should get specific cat image', async () => {
      const res = await request(app)
        .get(`/catkit/${uploadedImageId}`)
      await expect(res.statusCode).toEqual(200)
    })
})

describe('testing put endpoint', () => {
  it('should update an existing cat image', async () => {
    const res = await request(app)
      .put(`/catkit/${uploadedImageId}`)
      .set({'connection': 'keep-alive'})
      .field('name','cat test replace update')
      .field('description', 'cat test image replace update')
      .attach('image', './static/cat_2.jpg')
      .set('Content-type', 'multipart/form-data')
    expect(res.statusCode).toEqual(200)
  })
})

describe('testing delete endpoint', () => {
    it('should delete specific cat image', async () => {
      const res = await request(app)
        .del(`/catkit/${uploadedImageId}`)
      expect(res.statusCode).toEqual(200)
    })
})