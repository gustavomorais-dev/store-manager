const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { 
  productsFromServiceOk,
  productsFromModel,
  productFromServiceOk,
  productFromModel,
  createdProductFromServiceOk,
  createdProductFromModel,
} = require('../mocks/products.mock');
const HTTP_STATUS = require('../../../src/utils/statusHTTP');
const { productsMiddlewares } = require('../../../src/middlewares');

describe('Testes do PRODUCTS CONTROLLER:', function () {
  it('Recupera os produtos com sucesso - status 200', async function () {
    sinon.stub(productsService, 'getProducts').resolves(productsFromServiceOk);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Recupera um produto pelo ID com sucesso - status 200', async function () {
    sinon.stub(productsService, 'getProductById').resolves(productFromServiceOk);

    const req = { params: { id: 21 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Adiciona corretamente um novo produto a database', async function () {
    sinon.stub(productsService, 'createProduct').resolves(createdProductFromServiceOk);

    const req = { params: { }, body: { name: 'new product' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.CREATED);
    expect(res.json).to.have.been.calledWith(createdProductFromModel);
  });

  it('Atualiza corretamente um produto', async function () {
    const next = sinon.stub().returns();

    const req = { params: { id: 1 },
    body: { name: 'updated' } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(productsService, 'updateProduct').resolves({
      status: 200,
      data: { id: 1, name: 'updated' },
    });
    
    productsMiddlewares.validateUpdateProductKeys(req, res, next);
    expect(next).to.have.been.calledWith();
    
    productsMiddlewares.validateUpdateProductValues(req, res, next);
    expect(next).to.have.been.calledWith();

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'updated' });
  });

  afterEach(function () {
    sinon.restore();
  });
});