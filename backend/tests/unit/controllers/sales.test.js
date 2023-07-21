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
const { productsModel } = require('../../../src/models');

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

  it('Retorna o erro esperado ao criar uma venda sem o campo productId', async function () {
    const req = {
      params: {},
      body: [
        {
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await salesMiddlewares.validateCreateSaleKeys(req, res);
  
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" is required',
    });
  });

  it('Retorna o erro esperado ao criar uma venda sem o campo quantity', async function () {
    const req = {
      params: {},
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
        },
      ],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await salesMiddlewares.validateCreateSaleKeys(req, res);
  
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" is required',
    });
  });

  it('Retorna o erro esperado ao criar uma venda com o campo quantidade inválido', async function () {
    const req = {
      params: {},
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 1,
          quantity: 0,
        },
      ],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await salesMiddlewares.validateCreateSaleValues(req, res);
  
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" must be greater than or equal to 1',
    });
  });

  it('Retorna o erro esperado ao criar uma venda com o id de produto que não existe', async function () {
    const req = {
      params: {},
      body: [
        {
          productId: 21515,
          quantity: 1,
        },
        {
          productId: 1,
          quantity: 5,
        },
      ],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const stub = sinon.stub(productsModel, 'findById');
    stub.onFirstCall().resolves(undefined);
    stub.onSecondCall().resolves(undefined);

    await salesMiddlewares.validateCreateSaleDBValues(req, res);
  
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.NOT_FOUND);
    expect(res.json).to.have.been.calledWith({
      message: 'Product not found',
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});