const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const Order = require('../models/orderModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Order Management System', () => {
    before(async () => {
        await Order.deleteMany({});
    });

    it('should create a new order', async () => {
        const res = await chai.request(app)
            .post('/orders')
            .send({
                id: '226',
                datetime: '2022-11-02T12:12:12.112Z',
                totalfee: 150,
                services: [{ id: '123' }],
            });

        expect(res).to.have.status(201);
        expect(res.body.id).to.equal('226');
    });

    it('should get all orders', async () => {
        const res = await chai.request(app)
            .get('/orders/all');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(1);
    });

    it('should update an existing order', async () => {
        const createdOrder = await Order.create({
            id: '227',
            datetime: '2022-11-03T12:12:12.112Z',
            totalfee: 200,
            services: [{ id: '456' }],
        });

        const res = await chai.request(app)
            .put(`/orders/${createdOrder._id}`)
            .send({
                totalfee: 250,
            });

        expect(res).to.have.status(200);
        expect(res.body.totalfee).to.equal(250);
    });

    it('should delete an existing order', async () => {
        const createdOrder = await Order.create({
            id: '228',
            datetime: '2022-11-04T12:12:12.112Z',
            totalfee: 300,
            services: [{ id: '789' }],
        });

        const res = await chai.request(app)
            .delete(`/orders/${createdOrder._id}`);

        expect(res).to.have.status(204);

        const deletedOrder = await Order.findById(createdOrder._id);
        expect(deletedOrder).to.be.null;
    });
});
