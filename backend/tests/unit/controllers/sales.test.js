const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const HTTP_STATUS = require('../../../src/utils/statusHTTP');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  salesFromServiceOk,
  salesFromService,
  saleFromServiceOk,
  saleFromService,
  saleCreatedFromService,
  saleCreatedFromServiceOk,
} = require('../mocks/sales.mock');
const { salesMiddlewares } = require('../../../src/middlewares');

describe('Testes do SALES CONTROLLER:', function () {
  it('Recupera as vendas com sucesso - status 200', async function () {
    sinon.stub(salesService, 'getSales').resolves(salesFromServiceOk);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith(salesFromService);
  });

  it('Recupera uma venda pelo ID com sucesso - status 200', async function () {
    sinon.stub(salesService, 'getSaleById').resolves(saleFromServiceOk);

    const req = { params: { id: 2 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith(saleFromService);
  });

  it('Cria com sucesso uma venda - status 201', async function () {
    const next = sinon.stub().returns();

    const req = { params: { },
    body: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ] };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesService, 'createSale').resolves(saleCreatedFromServiceOk);
    
    salesMiddlewares.validateCreateSaleKeys(req, res, next);
    expect(next).to.have.been.calledWith();

    salesMiddlewares.validateCreateSaleValues(req, res, next);
    expect(next).to.have.been.calledWith();
    
    salesMiddlewares.validateCreateSaleDBValues(req, res, next);
    expect(next).to.have.been.calledWith();

    await salesController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_STATUS.CREATED);
    expect(res.json).to.have.been.calledWith(saleCreatedFromService);
  });

  afterEach(function () {
    sinon.restore();
  });
});